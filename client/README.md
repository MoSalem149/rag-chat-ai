# Chat with Files - Client

React-based frontend for the Chat with Files RAG application. Provides an intuitive interface for uploading documents and querying them with AI.

## 🛠️ Tech Stack

- **React 19** - UI framework with modern hooks
- **Vite** - Fast build tool and dev server
- **Axios** - HTTP client for API communication
- **ESLint** - Code quality and style enforcement
- **CSS** - Responsive styling

## 📁 Project Structure

```
src/
├── App.jsx          # Main application component
│                   # - File upload handler
│                   # - Chat message interface
│                   # - Message display
├── main.jsx         # React app entry point
└── index.css        # Global styles and layout

public/             # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## 📜 Available Scripts

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server with HMR |
| `npm run build`   | Build optimized production bundle |
| `npm run lint`    | Run ESLint to check code quality  |
| `npm run preview` | Preview production build locally  |

## 🔄 Key Features

### File Upload

- Select PDF or DOCX files
- Upload to backend for processing
- Real-time upload status feedback
- Clear success/error messages

### Chat Interface

- Type messages to query uploaded documents
- View message history
- Loading states during processing
- Responsive message display

### User Experience

- Clean, intuitive interface
- Real-time feedback
- Error handling and display
- Mobile-friendly responsive design

## 📝 Environment Variables

Create `.env` file from `.env.example`:

```env
VITE_API_URL=http://localhost:3000
```

## 🔌 API Integration

The frontend communicates with backend via Axios:

### Upload Endpoint

```javascript
POST /api/chat/upload
Content-Type: multipart/form-data
Body: { file: File }
```

### Chat Endpoint

```javascript
POST /api/chat/query
Content-Type: application/json
Body: { message: string }
```

## 🎨 Styling

- Responsive CSS Grid/Flexbox layout
- Mobile-first design approach
- Accessible color contrast
- Smooth animations and transitions

## 📦 Build & Deployment

### Development Build

```bash
npm run build
npm run preview
```

### Production Deployment

**Vercel**

```bash
vercel deploy
```

**Netlify**

```bash
npm run build
# Deploy dist/ folder
```

**Docker**

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 🧹 Code Quality

```bash
# Run linter
npm run lint

# Fix linting issues
npx eslint . --fix
```

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run linter: `npm run lint`
4. Commit and push
5. Open pull request

## 📄 Related Documentation

- [Main Project README](../README.md)
- [Backend Documentation](../server/README.md)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
