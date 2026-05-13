import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Upload File
  const uploadFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const res = await axios.post(
        `${API_BASE_URL}/api/chat/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      alert(`Uploaded successfully! chunks: ${res.data.chunks}`);
      setFile(null);
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Send Question
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
        { role: "bot", text: "Error: " + err.message },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h2 className="app-title">💬 RAG Chat System</h2>

      {/* Upload */}
      <div className="upload-box">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button className="upload-btn" onClick={uploadFile}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </div>

      {file && <p className="file-name">📄 {file.name}</p>}

      {/* Chat */}
      <div className="chat-box">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.role}`}>
            <div>{msg.text}</div>

            {msg.sources?.length > 0 && (
              <div className="sources">
                <details>
                  <summary>📚 Sources</summary>
                  {msg.sources.map((s, i) => (
                    <div key={i}>• {s.text.slice(0, 120)}...</div>
                  ))}
                </details>
              </div>
            )}
          </div>
        ))}

        {loading && <p>🤖 thinking...</p>}
      </div>

      {/* Input */}
      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />

        <button className="send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
