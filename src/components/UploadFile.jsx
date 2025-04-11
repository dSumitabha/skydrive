"use client";
import { AiOutlineCloudUpload } from "react-icons/ai";

export default function UploadFile() {
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    alert(`Uploading: ${file.name}`);
  };

  return (
    <label className="flex items-center gap-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm cursor-pointer">
      <AiOutlineCloudUpload />
      Upload File
      <input type="file" onChange={handleUpload} className="hidden" />
    </label>
  );
}
