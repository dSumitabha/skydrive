"use client";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState } from "react";

export default function UploadFile({ parentId = null, onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error" | null
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    if (parentId) {
      formData.append("folderId", parentId);
    }

    try {
      setUploading(true);
      setStatus(null);
      setMessage("");

      const res = await fetch("/api/upload_file", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      setStatus("success");
      setMessage(`Uploaded: ${data.file.name}`);

      setTimeout(() => {
        onUploadComplete?.();
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error("Upload error:", err);
      setStatus("error");
      setMessage("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <label className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm cursor-pointer">
        <AiOutlineCloudUpload />
        {uploading ? "Uploading..." : "Upload File"}
        <input type="file" onChange={handleUpload} className="hidden" />
      </label>

      {status && (
        <p className={`text-sm ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}