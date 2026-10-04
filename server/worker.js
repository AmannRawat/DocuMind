import { Worker } from 'bullmq'
import { Document } from "@langchain/core/documents"
import { QdrantVectorStore } from "@langchain/qdrant"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import { CharacterTextSplitter } from "@langchain/textsplitters"
import "dotenv/config"

// Gemini embedding model
const embeddingModel = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-2",
    apiKey: process.env.GEMINI_API_KEY,
})

const worker = new Worker(
    'File-upload-queue',
    async (job) => {
        console.log('Job received:', job.data);
        const data = JSON.parse(job.data);
        /*Path: data.Path
        read the pdf from path, then chunk it into smaller pieces.
        call the gemini embedding model for every chunks
        store the chunk in qdrant db
        */


        //Load PDF
        const loader = new PDFLoader(data.Path)
        const docs = await loader.load()
        console.log(`Loaded ${docs.length} pages`)

        //Split PDF into chunks
        const splitter = new CharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        })

        const splitChunks = await splitter.splitDocuments(docs)
        console.log(`Split into ${splitChunks.length} chunks`)

        // -------------------------
        // 3. Store chunks + embeddings in Qdrant
        // -------------------------

        const qdrant = await QdrantVectorStore.fromDocuments(
            splitChunks,
            embeddingModel,
            {
                url: "http://localhost:6333",
                collectionName: "pdf_documents",
            }
        )

        console.log("PDF chunks stored in Qdrant")
    },
    {
        concurrency: 2,
        connection: {
            host: 'localhost',
            port: 6379,
            maxRetriesPerRequest: null
        }
    }
)

worker.on('completed', (job) => {
    console.log(`Job ${job.id} completed`)
})

worker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed:`, err)
})