"use client";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useState } from "react";

export default function UploadFile({ parentId = null, onUploadComplete }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    // 💡 Append folderId only if it's not null
    if (parentId) {
      formData.append("folderId", parentId);
    }

    try {
      setUploading(true);

      const res = await fetch("/api/upload_file", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      alert(`Uploaded: ${data.file.name}`);

      // Optional callback after successful upload
      onUploadComplete?.();
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <label className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm cursor-pointer">
      <AiOutlineCloudUpload />
      {uploading ? "Uploading..." : "Upload File"}
      <input type="file" onChange={handleUpload} className="hidden" />
    </label>
  );
}
