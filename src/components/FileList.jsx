"use client";

import { useEffect, useState } from "react";
import FileItem from "./FileItem";

export default function FileList({ folderId }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const url = folderId
          ? `/api/files?folderId=${folderId}`
          : `/api/files`;
        const res = await fetch(url);
        const data = await res.json();
        setFiles(data.files || []);
      } catch (err) {
        console.error("Error fetching files:", err);
        setFiles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, [folderId]);

  if (loading) return <p className="text-gray-500">Loading files...</p>;
  if (!files.length) return <p className="text-gray-500">No files found.</p>;

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {files.map((file) => (
        <FileItem key={file._id} id={file._id} name={file.name} type={file.mimeType} />
      ))}
    </div>
  );
}
