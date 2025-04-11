"use client";
import { useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";

export default function AddFolder({ parentId = null, onFolderCreated = () => {} }) {
  const [folderName, setFolderName] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = async () => {
    if (!folderName.trim()) return;

    try {
      const res = await fetch("/api/add_folder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: folderName.trim(), parentId })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create folder");

      showToast("Folder created successfully");
      setFolderName("");
      onFolderCreated(data.folder); // callback to refresh view
    } catch (err) {
      showToast(err.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <input type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="New folder name" className="border rounded px-3 py-2 text-sm" />
        <button onClick={handleAdd} className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm">
          <AiOutlineFolderAdd />
          Add Folder
        </button>
      </div>
      {toast && (
        <div className={`absolute bottom-[-2.5rem] left-0 text-sm px-4 py-2 rounded shadow-md ${toast.type === "error" ? "bg-red-500" : "bg-green-600"} text-white`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
