import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import API from "../services/api";

function FileUploader() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setFiles(acceptedFiles);

    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setUploading(true);

      await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Files uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
    },
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center bg-white cursor-pointer hover:border-black transition"
      >
        <input {...getInputProps()} />

        <p className="text-lg font-medium text-slate-700">
          Drag & drop project files here
        </p>

        <p className="text-sm text-slate-500 mt-2">
          PDF, CSV, XLSX supported
        </p>
      </div>

      {uploading && (
        <div className="text-blue-600 font-medium">Uploading files...</div>
      )}

      {files.length > 0 && (
        <div className="bg-white rounded-xl p-4 border">
          <h3 className="font-semibold mb-2">Uploaded Files</h3>

          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="text-slate-700">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FileUploader;
