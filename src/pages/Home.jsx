import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="bg-white rounded-3xl p-12 border shadow-sm">
          <h1 className="text-5xl font-bold text-slate-900 leading-tight">
            AI-Powered Project Intelligence Assistant
          </h1>

          <p className="text-slate-600 mt-6 text-lg max-w-3xl">
            Upload project reports, spreadsheets, and planning documents to
            analyze risks, budgets, timelines, and project status using a
            multi-agent AI architecture.
          </p>

          <div className="mt-10 flex gap-4">
            <Link
              to="/upload"
              className="bg-black text-white px-6 py-3 rounded-xl"
            >
              Upload Documents
            </Link>

            <Link
              to="/chat"
              className="border border-black px-6 py-3 rounded-xl"
            >
              Open Assistant
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;