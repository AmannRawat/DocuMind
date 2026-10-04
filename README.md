# DocuMind

> **AI-powered document understanding and retrieval using Retrieval-Augmented Generation (RAG).**

DocuMind is a full-stack AI document assistant that allows users to upload PDF documents and ask questions about their contents.

Instead of sending an entire document directly to an LLM, DocuMind uses a **Retrieval-Augmented Generation (RAG)** pipeline to retrieve the most relevant sections of a document and provide them as context to the LLM before generating an answer.

The project is being built as a practical implementation of modern **RAG architecture, vector search, asynchronous processing, embeddings, and LLM-based generation**.

---

## ✨ Features

- 📄 PDF document upload
- 🔍 Semantic search over document content
- 🧩 Document chunking for efficient retrieval
- 🧠 Gemini-powered text embeddings
- 🗄️ Qdrant vector database for similarity search
- ⚡ Asynchronous document processing using BullMQ
- 🔄 Valkey-backed job queue
- 🤖 Gemini LLM-powered responses
- 🌐 Next.js frontend
- 🚀 Express.js backend
- 🐳 Docker-based infrastructure for local development

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │     Next.js UI      │
                    │      (Client)       │
                    └──────────┬──────────┘
                               │
                               │ HTTP
                               ▼
                    ┌─────────────────────┐
                    │    Express API      │
                    │      (Server)       │
                    └──────────┬──────────┘
                               │
                    Upload PDF │
                               ▼
                    ┌─────────────────────┐
                    │    BullMQ Queue     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Worker         │
                    │ PDF Processing      │
                    └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    ▼                     ▼
             PDF Extraction          Text Chunking
                                          │
                                          ▼
                               Gemini Embeddings
                                          │
                                          ▼
                              ┌─────────────────────┐
                              │       Qdrant        │
                              │   Vector Database   │
                              └──────────┬──────────┘
                                         │
                                  Similarity Search
                                         │
                                         ▼
                                  Retrieved Chunks
                                         │
                                         ▼
                                  Gemini LLM
                                         │
                                         ▼
                                  Final Response
```

---

## 🧠 How RAG Works in DocuMind

DocuMind separates **retrieval** from **generation**.

### 1. Document Ingestion

When a PDF is uploaded:

```text
PDF
 ↓
PDF Loader
 ↓
Document Pages
 ↓
Text Chunking
 ↓
Gemini Embeddings
 ↓
Vector Representations
 ↓
Qdrant
```

The document is divided into smaller chunks. Each chunk is converted into an embedding vector and stored in Qdrant along with its associated document information.

### 2. Retrieval

When a user asks a question:

```text
User Question
      ↓
Gemini Embedding Model
      ↓
Query Vector
      ↓
Qdrant Similarity Search
      ↓
Relevant Document Chunks
```

The embedding model converts the question into a vector.

Qdrant then compares the query vector against the stored document vectors and retrieves the most semantically relevant chunks.

### 3. Generation

The retrieved context is then provided to the Gemini LLM:

```text
User Question
      +
Retrieved Context
      ↓
Gemini LLM
      ↓
Generated Answer
```

This allows the model to answer using information retrieved from the uploaded document instead of relying only on its pretrained knowledge.

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Clerk

### Backend

- Node.js
- Express.js
- Multer
- BullMQ

### AI / RAG

- Google Gemini
- Gemini Embeddings
- LangChain
- LangChain Qdrant integration
- LangChain PDF loader
- LangChain text splitters

### Infrastructure

- Qdrant
- Valkey
- Docker
- Docker Compose

---

## 📁 Project Structure

```text
DocuMind/
│
├── client/
│   └── Next.js application
│
├── server/
│   ├── index.js          # Express API server
│   ├── worker.js         # Background PDF processing worker
│   ├── uploads/          # Uploaded PDFs (ignored by Git)
│   └── ...
│
├── docker-compose.yml    # Local infrastructure
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- pnpm
- Docker Desktop
- Git
- A Google Gemini API key

---

### 1. Clone the repository

```bash
git clone https://github.com/AmannRawat/DocuMind.git

cd DocuMind
```

---

### 2. Install dependencies

Install client dependencies:

```bash
cd client
pnpm install
```

Install server dependencies:

```bash
cd ../server
pnpm install
```

---

### 3. Configure environment variables

Create a `.env` file inside the `server` directory:

```env
GEMINI_API_KEY=your_gemini_api_key
```

> Never commit your `.env` file or API keys to GitHub.

---

### 4. Start infrastructure

From the project root:

```bash
docker compose up -d
```

This starts the infrastructure required by the application.

---

### 5. Start the backend

From the `server` directory:

```bash
pnpm dev
```

The API server runs on:

```text
http://localhost:8001
```

---

### 6. Start the worker

In a separate terminal:

```bash
cd server
pnpm worker
```

The worker handles background PDF processing and stores the resulting embeddings in Qdrant.

---

### 7. Start the frontend

In another terminal:

```bash
cd client
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

## 🔄 Current RAG Pipeline

The current implementation follows this flow:

```text
Upload PDF
    ↓
Express API
    ↓
BullMQ
    ↓
Background Worker
    ↓
PDFLoader
    ↓
Text Chunking
    ↓
Gemini Embeddings
    ↓
Qdrant
    ↓
Similarity Search
    ↓
Retrieved Context
    ↓
Gemini LLM
    ↓
Answer
```

---

## 🔐 Security

Environment variables containing API keys are intentionally excluded from version control.

Make sure your `.gitignore` contains:

```gitignore
.env
.env.*
!.env.example
```

Uploaded PDFs should also remain outside version control:

```gitignore
uploads/
```

---

## 🎯 Learning Goals

DocuMind is being developed to gain practical experience with:

- Retrieval-Augmented Generation (RAG)
- Embeddings and vector search
- Vector databases
- Document ingestion pipelines
- Asynchronous job processing
- LLM application architecture
- LangChain integrations
- Qdrant
- BullMQ and Valkey
- Docker-based development
- Full-stack AI application development

The goal is not just to build a chatbot, but to understand **how a production-oriented RAG system works internally**.

---

## 📌 Project Status

🚧 **Active Development**

DocuMind is currently being developed and its architecture and feature set may evolve as new RAG capabilities are added.

---

## 👨‍💻 Author

**Aman Rawat**

GitHub: [@AmannRawat](https://github.com/AmannRawat)

---

## ⭐ Acknowledgements

This project is built as a hands-on learning project focused on understanding modern AI engineering and RAG system architecture.

If you find the project useful, consider giving it a ⭐ on GitHub.
