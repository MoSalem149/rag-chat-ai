# Chat with Files - Server

Node.js/Express backend for the Chat with Files RAG application. Handles document processing, embeddings, semantic search, and AI chat interactions using LangChain and OpenAI.

## 🛠️ Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB + Mongoose** - Database and ODM
- **LangChain** - RAG orchestration framework
- **OpenAI API** - Embeddings and LLM
- **Multer** - File upload handling
- **Mammoth** - DOCX parsing
- **PDF-Parse** - PDF text extraction
- **Nodemon** - Development auto-reload

## 📁 Project Structure

```
src/
├── app.js                      # Express setup & middleware
├── controllers/
│   └── chat.controller.js      # Route handlers
│                              # - uploadFile(): Process & embed docs
│                              # - queryChat(): Search & generate response
├── services/
│   ├── file.service.js         # File parsing (PDF, DOCX)
│   ├── chunk.service.js        # Text splitting & chunking
│   ├── embedding.service.js    # OpenAI embedding setup
│   ├── search.service.js       # Vector similarity search
│   ├── gpt.service.js          # LLM chain setup
│   └── vector.service.js       # Vector operations
├── models/
│   └── document.model.js       # MongoDB schema for chunks
├── routes/
│   └── chat.routes.js          # API route definitions
└── uploads/                    # Temporary file storage

package.json                   # Dependencies & scripts
.env                          # Environment variables (DO NOT COMMIT)
.env.example                  # Environment template
test-env.js                   # Test environment setup
```

## 🔄 Core Services Explained

### File Service

- Reads uploaded files (PDF/DOCX)
- Extracts text content
- Handles various file formats

### Chunk Service

- Splits large documents into manageable pieces
- Maintains context overlap between chunks
- Optimizes for token limits

### Embedding Service

- Creates OpenAI embedding instance
- Converts text chunks to vectors
- Enables semantic similarity matching

### Search Service

- Performs vector similarity search
- Retrieves contextually relevant chunks
- Ranks results by relevance

### GPT Service

- Initializes LLM instance
- Manages prompt templates
- Handles context-aware queries

### Vector Service

- Calculates vector distances
- Compares embeddings
- Supports semantic search operations

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- MongoDB Atlas account
- OpenAI API key

### Installation

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Edit .env with your credentials
# Add: MONGO_URI, OPENAI_API_KEY, PORT

# Start development server
npm run dev
```

Server will run at `http://localhost:3000`

## 📜 Available Scripts

| Script        | Description                           |
| ------------- | ------------------------------------- |
| `npm run dev` | Start server with Nodemon auto-reload |
| `npm start`   | Start server (production)             |

## 📝 Environment Variables

Create `.env` from `.env.example` and populate:

```env
# Server
PORT=3000

# MongoDB
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/?ssl=true&authSource=admin
MONGODB_DB=rag_app
MONGODB_COLLECTION=file_chunks

# OpenAI
OPENAI_API_KEY=sk-proj-xxxxx
```

### Variable Descriptions

| Variable             | Purpose                   | Example           |
| -------------------- | ------------------------- | ----------------- |
| `PORT`               | Server listening port     | `3000`            |
| `MONGO_URI`          | MongoDB connection string | MongoDB Atlas URI |
| `MONGODB_DB`         | Database name             | `rag_app`         |
| `MONGODB_COLLECTION` | Collection for chunks     | `file_chunks`     |
| `OPENAI_API_KEY`     | OpenAI API key            | `sk-proj-...`     |

## 🔌 API Endpoints

### File Upload

```
POST /api/chat/upload
Content-Type: multipart/form-data

Body:
- file: File (PDF/DOCX)

Response:
{
  "success": true,
  "chunks": 45
}
```

### Chat Query

```
POST /api/chat/query
Content-Type: application/json

Body:
{
  "message": "What is in the document?"
}

Response:
{
  "response": "Based on the document...",
  "sources": ["document.pdf"]
}
```

### Health Check

```
GET /
Response: "API Running"
```

## 🔐 Security Considerations

### Development

- Store sensitive keys in `.env` (gitignored)
- Never commit `.env` file
- Use `.env.example` as template

### Production

- Rotate API keys regularly
- Use managed secrets (AWS Secrets, Google Cloud Secret Manager)
- Implement rate limiting
- Validate all file uploads
- Sanitize user input
- Enable HTTPS only
- Configure CORS for allowed origins

## 📦 File Upload Handling

### Supported Formats

- **PDF** - Text extraction via pdf-parse
- **DOCX** - Word document parsing via Mammoth
- **TXT** - Plain text files

### Process Flow

1. File received via Multer
2. Content extracted by appropriate parser
3. Text split into chunks
4. Chunks embedded via OpenAI API
5. Embeddings stored in MongoDB
6. File deleted from disk (cleanup)

### Limitations

- Max file size: 10MB (configurable)
- Processing time depends on file size
- API rate limits apply

## 🧠 RAG Pipeline

1. **Document Upload**

   ```
   File → Parse → Chunk → Embed → Store
   ```

2. **Query Processing**

   ```
   Query → Embed → Search → Retrieve → Format → LLM → Response
   ```

3. **Data Flow**
   - User uploads document
   - Backend processes and chunks text
   - OpenAI embeds chunks
   - Embeddings stored in MongoDB
   - User asks question
   - Query embedded and compared to stored chunks
   - Top-K relevant chunks retrieved
   - LangChain formats context
   - OpenAI generates response

## 🔄 Database Schema

### Document Model

```javascript
{
  text: String,           // Chunk content
  embedding: Array,       // Vector (1536 dims for text-embedding-3-small)
  filename: String,       // Source document
  createdAt: Date,        // Timestamp
  updatedAt: Date
}
```

## 🐳 Docker Deployment

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json .
RUN npm install --production

COPY . .

EXPOSE 3000

ENV NODE_ENV=production

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t chat-with-files-server .
docker run -p 3000:3000 --env-file .env chat-with-files-server
```

## 🧪 Testing

```bash
# Run test environment setup
node test-env.js

# Test file upload
curl -X POST http://localhost:3000/api/chat/upload \
  -F "file=@test.pdf"

# Test query
curl -X POST http://localhost:3000/api/chat/query \
  -H "Content-Type: application/json" \
  -d '{"message":"What is this document about?"}'
```

## 📈 Performance Optimization

### Chunking Strategy

- Chunk size: 1000 tokens (configurable)
- Overlap: 200 tokens (context preservation)
- Balances coverage vs. retrieval precision

### Embedding Caching

- Store computed embeddings in MongoDB
- Avoid re-computing for same text
- Significant speedup for repeated queries

### Search Optimization

- Vector indexing for faster similarity search
- Pagination support for large result sets
- Configurable top-K results (default: 5)

## 🔧 Troubleshooting

### MongoDB Connection Issues

```bash
# Verify connection string
# Check IP whitelist in MongoDB Atlas
# Ensure credentials are correct
```

### OpenAI API Errors

```bash
# Verify API key format
# Check account has sufficient credits
# Monitor rate limit usage
```

### File Processing Errors

```bash
# Ensure file format is supported
# Check file size limits
# Verify Multer disk space
```

## 📚 Dependencies Reference

| Package           | Purpose               | Version |
| ----------------- | --------------------- | ------- |
| express           | Web framework         | 5.2.1   |
| mongoose          | MongoDB ORM           | 9.6.2   |
| langchain         | RAG orchestration     | 0.2.20  |
| @langchain/openai | OpenAI integration    | 0.2.11  |
| dotenv            | Environment config    | 16.4.5  |
| cors              | Cross-origin requests | 2.8.6   |
| multer            | File uploads          | 2.1.1   |
| mammoth           | DOCX parsing          | 1.12.0  |
| pdf-parse         | PDF extraction        | 1.2.0   |

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/name`
2. Make changes
3. Test thoroughly
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature/name`
6. Open pull request

## 📄 Related Documentation

- [Main Project README](../README.md)
- [Client Documentation](../client/README.md)
- [LangChain Docs](https://docs.langchain.com)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [MongoDB Documentation](https://docs.mongodb.com)
