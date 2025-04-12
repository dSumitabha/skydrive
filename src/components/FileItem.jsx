import {
  AiFillFilePdf,
  AiFillFileImage,
  AiFillFileText,
  AiFillFileUnknown,
} from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";

export default function FileItem({ name, type, id, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error"
  const [hidden, setHidden] = useState(false);

  let Icon = AiFillFileUnknown;
  if (type.includes("pdf")) Icon = AiFillFilePdf;
  else if (type.includes("image")) Icon = AiFillFileImage;
  else if (type.includes("text")) Icon = AiFillFileText;

  const handleDelete = async (e) => {
    e.stopPropagation();

    if (isDeleting) return;
    setIsDeleting(true);
    setStatus(null);

    try {
      const res = await fetch(`/api/delete_file/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to delete file");

      setStatus("success");
      setTimeout(() => {
        setHidden(true);
        onDelete?.(id);
      }, 800); // Delay to allow UI message to show before removal
    } catch (err) {
      console.error("Delete error:", err);
      setStatus("error");
    } finally {
      setIsDeleting(false);
    }
  };

  if (hidden) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow transition relative group">
      <Link href={`/api/download_file/${id}`} passHref>
        <div className="flex flex-col items-center cursor-pointer">
          <Icon className="text-4xl text-gray-600 mb-2" />
          <p className="text-sm font-medium break-words truncate w-full text-center">{name}</p>
        </div>
      </Link>

      <button onClick={handleDelete} disabled={isDeleting} className="mt-2 text-red-600 hover:text-red-800 text-sm w-full" >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>

      {status === "success" && (
        <p className="text-green-600 text-xs mt-1 text-center">Deleted!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-xs mt-1 text-center">Failed to delete</p>
      )}
    </div>
  );
}
