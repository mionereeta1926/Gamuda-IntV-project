import { useState } from "react";
import API from "../services/api";
import MessageBubble from "./MessageBubble";
import CitationCard from "./CitationCard";

function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const downloadMarkdownTableAsCSV = (markdownTable) => {
    if (!markdownTable) return;

    const lines = markdownTable
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.startsWith("|"));

    if (lines.length < 2) return;

    // Remove separator row like |---|---|
    const rows = lines.filter(
      (_, index) => !/^(\|\s*-+\s*)+\|?$/.test(lines[index])
    );

    const csvRows = rows.map((row) => {
      return row
        .split("|")
        .slice(1, -1)
        .map((cell) => `"${cell.trim().replace(/"/g, '""')}"`)
        .join(",");
    });

    const cleanedRows = csvRows.map((row) =>
      row
        .replace(/â€‘/g, "-")
        .replace(/â€¢/g, "•")
        .replace(/â€œ|â€/g, '"')
        .replace(/â€˜|â€™/g, "'")
    );

    const csvContent = cleanedRows.join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table_data.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
            <div>
              <MessageBubble
                sender={message.sender}
                text={message.text}
                agent={message.agent}
              />

              {(message.agent === "Tabulate Agent" ||
                message.agent === "Financial Analysis Agent") && (
                <button
                  onClick={() => downloadMarkdownTableAsCSV(message.text)}
                  className="ml-2 mb-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Download CSV
                </button>
              )}
            </div>

            {message.citations && message.citations.length > 0 && (
              <div className="ml-2 mb-4">
                <CitationCard citations={message.citations} />
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
