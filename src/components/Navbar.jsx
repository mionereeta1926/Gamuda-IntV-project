import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-slate-800">
        Project Intelligence Assistant
      </h1>

      <div className="flex gap-4">
        <Link to="/" className="text-slate-700 hover:text-black">
          Home
        </Link>

        <Link to="/upload" className="text-slate-700 hover:text-black">
          Upload
        </Link>

        <Link to="/chat" className="text-slate-700 hover:text-black">
          Assistant
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;