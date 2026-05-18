function MessageBubble({ sender, text }) {
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
        {text}
      </div>
    </div>
  );
}

export default MessageBubble;