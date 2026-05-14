import { useState, useRef, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setUploadStatus("Uploading...");

      const res = await axios.post(
        `${API_BASE_URL}/api/chat/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setUploadStatus(`✓ Successfully uploaded! (${res.data.chunks} chunks)`);
      setFile(null);
      fileInputRef.current.value = "";
      setTimeout(() => setUploadStatus(""), 3000);
    } catch (err) {
      setUploadStatus("✗ Upload failed: " + err.message);
      setTimeout(() => setUploadStatus(""), 3000);
    } finally {
      setUploading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const question = input;
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/chat/ask`, {
        question,
      });

      const botMsg = {
        role: "bot",
        text: res.data.answer,
        sources: res.data.sources,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error: " + err.message, isError: true },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo">
              <span className="logo-icon">🤖</span>
            </div>
            <div className="header-text">
              <h1 className="app-title">RAG Chat</h1>
              <p className="app-subtitle">Intelligent Document Search & Chat</p>
            </div>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="chat-section">
          <div className="chat-box">
            {messages.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📚</div>
                <h3>Start a Conversation</h3>
                <p>Upload a document and ask questions to get started</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${msg.role} ${msg.isError ? "error" : ""}`}
              >
                <div className="message-avatar">
                  {msg.role === "user" ? "👤" : msg.isError ? "⚠️" : "🤖"}
                </div>
                <div className="message-content">
                  <div className="message-text">{msg.text}</div>

                  {msg.sources?.length > 0 && (
                    <div className="sources-section">
                      <button className="sources-toggle">
                        <span className="sources-icon">📄</span>
                        <span>
                          {msg.sources.length} Source
                          {msg.sources.length > 1 ? "s" : ""}
                        </span>
                      </button>
                      <div className="sources-list">
                        {msg.sources.map((s, idx) => (
                          <div key={idx} className="source-item">
                            <span className="source-bullet">▸</span>
                            <span className="source-text">
                              {s.text.slice(0, 150)}...
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="message bot loading-message">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>

        <div className="sidebar">
          <div className="sidebar-card">
            <h3 className="sidebar-title">📂 Upload Document</h3>
            <p className="sidebar-description">Upload PDF, DOC, or TXT files</p>

            <div className="file-input-wrapper">
              <input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setUploadStatus("");
                }}
                className="file-input"
                accept=".pdf,.doc,.docx,.txt"
              />

              <label htmlFor="file-upload" className="file-label">
                <span className="file-icon">+</span>
                <span>Choose File</span>
              </label>
            </div>

            {file && (
              <div className="file-preview">
                <span className="file-preview-icon">📄</span>
                <span className="file-preview-name">{file.name}</span>
                <button
                  className="file-remove-btn"
                  onClick={() => {
                    setFile(null);
                    fileInputRef.current.value = "";
                  }}
                >
                  ✕
                </button>
              </div>
            )}

            <button
              className="upload-btn"
              onClick={uploadFile}
              disabled={!file || uploading}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>

            {uploadStatus && (
              <div
                className={`upload-status ${
                  uploadStatus.includes("✓") ? "success" : "error"
                }`}
              >
                {uploadStatus}
              </div>
            )}
          </div>

          <div className="sidebar-card tips-card">
            <h3 className="sidebar-title">💡 Tips</h3>
            <ul className="tips-list">
              <li>Upload relevant documents</li>
              <li>Ask specific questions</li>
              <li>Review sources for accuracy</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="input-section">
        <div className="input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask a question about your documents..."
            className="message-input"
            rows="1"
          />
          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            <span>Send</span>
            <span className="send-icon">➜</span>
          </button>
        </div>
        <p className="input-hint">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
