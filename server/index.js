import express from 'express'
import cors from 'cors'
import multer from 'multer'
import { Queue } from 'bullmq'
import path from 'path'

const app = express();

const queue = new Queue("File-upload-queue", {
    connection: {
        host: 'localhost',
        port: 6379,
        maxRetriesPerRequest: null
    }
})

   const qdrant = await QdrantVectorStore.fromDocuments(
            splitChunks,
            embeddingModel,
            {
                url: "http://localhost:6333",
                collectionName: "pdf_docs",
            }
        )

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        cb(null, file.originalname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({ status: 'success', message: 'Server is running' })
})

app.post('/upload/pdf', upload.single('pdf'), async (req, res) => {
    console.log('Received file:', req.file)

    await queue.add('file-ready', JSON.stringify({
        filename: req.file.originalname,
        path: path.resolve(req.file.path),
    }))
    return res.json({
        status: 'success',
        message: 'PDF uploaded successfully',
        file: req.file
    })
})

app.get('/get', (req, res) => {
    const userQuery="what is this document about?";
})

app.listen(8001, () => {
    console.log("Server is running on port 8001");
})
