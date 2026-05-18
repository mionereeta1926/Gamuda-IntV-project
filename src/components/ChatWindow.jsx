import { useState } from "react";
import API from "../services/api";
import MessageBubble from "./MessageBubble";
import CitationCard from "./CitationCard";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage = {
      sender: "user",
      text: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await API.post("/chat", {
        question: trimmedInput,
      });

      const aiMessage = {
        sender: "assistant",
        text: response.data.answer,
        citations: response.data.citations || [],
        agent: response.data.agent,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "assistant",
          text: "An error occurred while processing your request.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-slate-50">
      <div className="flex-1 overflow-y-auto p-6">
        {messages.map((message, index) => (
          <div key={index}>
            <MessageBubble
              sender={message.sender}
              text={message.text}
              agent={message.agent}
            />

            {message.citations && (
              <div className="ml-2 mb-4 space-y-2">
                {message.citations.map((citation, idx) => (
                  <CitationCard
                    key={idx}
                    source={citation.source}
                    page={citation.page}
                  />
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="text-slate-500 mt-4">
            AI Assistant is analyzing documents...
          </div>
        )}
      </div>

      <div className="bg-white border-t p-4 flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about budgets, risks, delays, or project status..."
          className="flex-1 border rounded-xl px-4 py-3 outline-none"
        />

        <button
          onClick={handleSend}
          className="bg-black text-white px-6 rounded-xl hover:opacity-90"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
