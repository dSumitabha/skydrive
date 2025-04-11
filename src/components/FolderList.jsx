"use client";
import { useEffect, useState } from "react";
import FolderItem from "@/components/FolderItem";

export default function FolderList() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFolders() {
      try {
        const res = await fetch("/api/get_folders");
        console.log(res);
        const data = await res.json();
        if (res.ok) {
          setFolders(data.folders);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching folders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFolders();
  }, []);

  if (loading) return <p className="text-gray-500">Loading folders...</p>;
  if (!folders.length) return <p className="text-gray-500">No folders found.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {folders.map((folder) => (
        <FolderItem key={folder._id} name={folder.name} />
      ))}
    </div>
  );
}
