import Navbar from "../components/Navbar";
import FileUploader from "../components/FileUploader";

function Upload() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">
          Upload Project Documents
        </h1>

        <p className="text-slate-600 mb-10">
          Upload PDFs, CSV files, or Excel spreadsheets for AI-powered
          analysis.
        </p>

        <FileUploader />
      </div>
    </div>
  );
}

export default Upload;