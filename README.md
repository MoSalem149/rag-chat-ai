# Chat with Files - RAG Application

A full-stack Retrieval Augmented Generation (RAG) application that allows users to upload documents and have intelligent conversations with AI about their content.

## 📋 Project Overview

**Chat with Files** is a web application that combines document processing, vector embeddings, and large language models to enable users to:

- Upload documents (PDF, DOCX, etc.)
- Process documents into chunks with semantic embeddings
- Query documents using natural language
- Get AI-powered responses with context from uploaded files

### Use Cases

- Document Q&A systems
- Knowledge base searching
- Research paper analysis
- Technical documentation assistance
- Business document querying

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                  │
│              File Upload & Chat Interface                   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP/API
┌────────────────────────▼────────────────────────────────────┐
│                   Backend (Express.js)                       │
│              File Processing & Chat Logic                   │
└────────────────────────┬────────────────────────────────────┘
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼────┐  ┌──────▼──────┐  ┌────▼──────┐
    │  MongoDB │  │  LangChain  │  │  OpenAI   │
    │  Database│  │  RAG Engine │  │   API     │
    └──────────┘  └─────────────┘  └───────────┘
```

## 🔄 Data Flow

1. **Document Upload**
   - User selects file (PDF/DOCX)
   - Backend processes file content
   - Text is split into chunks

2. **Embedding & Storage**
   - OpenAI API generates embeddings for chunks
   - Chunks and embeddings stored in MongoDB
   - Enables semantic search capability

3. **Query Processing**
   - User sends chat message
   - System searches for relevant document chunks
   - LangChain constructs context-aware prompt
   - OpenAI generates response

4. **Response Delivery**
   - AI response sent to frontend
   - Chat history maintained in UI

## 🛠️ Tech Stack

### Frontend

- **Framework**: React 19
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Styling**: CSS

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **ORM**: Mongoose
- **AI/ML**:
  - LangChain (RAG orchestration)
  - OpenAI API (embeddings & LLM)
- **Database**: MongoDB
- **File Processing**:
  - Mammoth (DOCX parsing)
  - PDF-Parse (PDF extraction)
- **Middleware**:
  - CORS
  - Multer (file uploads)

### DevOps & Tools

- **Package Manager**: npm
- **Task Runner**: Nodemon
- **Environment**: dotenv

## 📁 Project Structure

```
chat-with-files/
├── client/                          # Frontend Application
│   ├── src/
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles
│   ├── public/                     # Static assets
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.js             # Vite configuration
│   ├── eslint.config.js           # ESLint rules
│   ├── index.html                 # HTML entry point
│   ├── README.md                  # Frontend documentation
│   ├── .gitignore                 # Git ignore rules
│   └── .env.example               # Environment template
│
├── server/                          # Backend Application
│   ├── src/
│   │   ├── app.js                 # Express app setup
│   │   ├── controllers/           # Route handlers
│   │   │   └── chat.controller.js
│   │   ├── services/              # Business logic
│   │   │   ├── file.service.js      # File parsing
│   │   │   ├── chunk.service.js     # Text chunking
│   │   │   ├── embedding.service.js # OpenAI embeddings
│   │   │   ├── search.service.js    # Vector search
│   │   │   ├── gpt.service.js       # LLM interface
│   │   │   └── vector.service.js    # Vector operations
│   │   ├── models/                # Database schemas
│   │   │   └── document.model.js
│   │   ├── routes/                # API endpoints
│   │   │   └── chat.routes.js
│   │   └── uploads/               # Temporary file storage
│   ├── package.json               # Backend dependencies
│   ├── test-env.js               # Test environment setup
│   ├── README.md                 # Backend documentation
│   ├── .gitignore                # Git ignore rules
│   ├── .env.example              # Environment template
│   └── .env                      # Environment variables (DO NOT COMMIT)
│
└── README.md                       # This file
```

## 🔑 Key Concepts

### 1. **RAG (Retrieval Augmented Generation)**

- Hybrid approach combining document retrieval with generative AI
- Reduces hallucinations by grounding responses in actual documents
- Enables LLMs to work with knowledge not in training data

### 2. **Vector Embeddings**

- Documents converted to high-dimensional vectors
- Semantic similarity measured using vector distance
- Enables finding contextually relevant chunks

### 3. **Text Chunking**

- Large documents split into overlapping segments
- Preserves context while managing token limits
- Improves relevance of retrieved information

### 4. **Semantic Search**

- Search based on meaning, not keywords
- Uses vector similarity to find relevant chunks
- Provides context for AI responses

### 5. **LLM Chain**

- Orchestrates multiple steps: retrieve → format → query → generate
- LangChain manages prompt templates and chaining logic
- OpenAI API provides intelligence

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- MongoDB Atlas account
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd chat-with-files
   ```

2. **Setup Backend**

   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your credentials
   npm install
   npm run dev
   ```

3. **Setup Frontend** (in new terminal)

   ```bash
   cd client
   cp .env.example .env
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3000

## 📝 Environment Variables

See `.env.example` files in both `client/` and `server/` directories for all required variables.

### Critical Server Variables

- `MONGO_URI` - MongoDB connection string
- `OPENAI_API_KEY` - OpenAI API key
- `PORT` - Server port (default: 3000)

## 📚 API Endpoints

### File Upload

- `POST /api/chat/upload` - Upload and process document

### Chat Query

- `POST /api/chat/query` - Send chat message with file context

## 🔐 Security Notes

- ⚠️ Never commit `.env` files (contains API keys)
- ⚠️ Use `.env.example` as template for deployment
- Implement rate limiting in production
- Validate file uploads server-side
- Sanitize user input before processing

## 📦 Deployment

### Backend Deployment (e.g., Render, Railway, Heroku)

1. Set environment variables on hosting platform
2. Ensure MongoDB Atlas connection string is valid
3. Configure CORS for production frontend URL
4. Build and deploy

### Frontend Deployment (e.g., Vercel, Netlify)

1. Update API endpoint to production server URL
2. Set environment variables if needed
3. Build: `npm run build`
4. Deploy dist folder

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Open pull request

## 📄 License

MoSlem149

## 🙋 Support

For issues and questions, please open an issue on the repository.

---

**Made with ❤️ for document intelligence**
