"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FolderItem from "@/components/FolderItem";
import AddFolder from "@/components/AddFolder";
import Header from "@/components/Header";

export default function FolderPage() {
  const params = useParams();
  const slug = params.slug || [];

  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentParentId, setCurrentParentId] = useState(null);

  useEffect(() => {
    async function fetchFolders() {
      try {
        const res = await fetch("/api/get_folders");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load folders");

        let folderTree = data.folders;
        let parentId = null;

        for (const name of slug) {
          const folder = folderTree.find(f => f.name === name && f.parentId === parentId);
          if (!folder) throw new Error(`Folder "${name}" not found`);
          parentId = folder._id;
        }

        const resNested = await fetch(`/api/get_folders?parentId=${parentId}`);
        const nestedData = await resNested.json();
        if (!resNested.ok) throw new Error(nestedData.error || "Failed to load nested folders");

        setFolders(nestedData.folders);
        setCurrentParentId(parentId);
      } catch (err) {
        console.error("Error:", err);
        setFolders([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFolders();
  }, [slug]);

  return (
    <>
      <Header />
      <div className="px-4 py-6">
        <div className="mb-4">
          <AddFolder parentId={currentParentId} onFolderCreated={() => window.location.reload()} />
        </div>
        {loading ? (
          <p className="text-gray-500">Loading folders...</p>
        ) : !folders.length ? (
          <p className="text-gray-500">No folders found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {folders.map(folder => (
              <FolderItem key={folder._id} name={folder.name} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
