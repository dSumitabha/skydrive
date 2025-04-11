"use client";
import { useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";

export default function AddFolder() {
  const [folderName, setFolderName] = useState("");

  const handleAdd = () => {
    if (!folderName) return;
    alert(`Creating folder: ${folderName}`);
    setFolderName("");
  };

  return (
    <div className="flex items-center gap-2">
      <input type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="New folder name" className="border rounded px-3 py-2 text-sm" />
      <button onClick={handleAdd} className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
        <AiOutlineFolderAdd />
        Add Folder
      </button>
    </div>
  );
}
