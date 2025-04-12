'use client';

import { useEffect, useState } from 'react';
import FileItem from './FileItem';

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFiles() {
      try {
        const res = await fetch('/api/get_files');
        const data = await res.json();
        setFiles(data.files);
      } catch (err) {
        console.error('Error fetching files:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchFiles();
  }, []);

  if (loading) return <p>Loading files...</p>;
  if (!files.length) return <p className="text-gray-500">No files at root level.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {files.map((file) => (
        <FileItem
          key={file._id}
          id={file._id}
          name={file.name}
          type={file.mimeType}
        />
      ))}
    </div>
  );
}
