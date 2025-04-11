"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AiOutlineCloud } from "react-icons/ai";
import FolderItem from "@/components/FolderItem";
import AddFolder from "@/components/AddFolder";
import UploadFile from "@/components/UploadFile";

export default function FolderPage() {
  const { slug } = useParams();
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFolders() {
      try {
        const res = await fetch("/api/get_folders");
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch");

        const parentPath = slug?.join("/") || "";
        let currentParentId = null;

        // Traverse folders to get parentId from path
        for (const name of slug || []) {
          const folder = data.folders.find(f => f.name === name && f.parentId === currentParentId);
          if (!folder) {
            currentParentId = null;
            break;
          }
          currentParentId = folder._id;
        }

        const nestedFolders = data.folders.filter(f => f.parentId === currentParentId);
        setFolders(nestedFolders);
      } catch (err) {
        console.error("Folder fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFolders();
  }, [slug]);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <header className="flex items-center justify-between flex-wrap gap-4 text-lg font-semibold mb-6">
        <div className="flex items-center gap-2 text-2xl">
          <AiOutlineCloud className="text-sky-500" />
          <span className="text-sky-700">SkyDrive</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-700 font-medium">Welcome, John</span>
          <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded">
            Logout
          </button>
        </div>
      </header>

      <div className="flex items-center justify-between mb-4">
        <AddFolder />
        <UploadFile />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Folders</h2>
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
      </section>
    </main>
  );
}
