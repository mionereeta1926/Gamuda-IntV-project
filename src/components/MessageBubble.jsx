import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

function MessageBubble({ sender, text, agent }) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-2xl px-4 py-3 rounded-2xl mb-4 ${
          isUser
            ? "bg-black text-white"
            : "bg-white border text-slate-800"
        }`}
      >
        {/* Markdown container */}
        <div className="markdown prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {text}
          </ReactMarkdown>
        </div>

        {!isUser && agent && (
          <p className="text-[11px] text-slate-500 mt-2">
            Agent: {agent}
          </p>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;