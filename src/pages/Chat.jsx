import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import Navbar from "../components/Navbar";

function Chat() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* <Sidebar /> */}

        <div className="flex-1">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default Chat;