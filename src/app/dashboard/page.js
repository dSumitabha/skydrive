import { AiOutlineCloud } from "react-icons/ai";
import FolderItem from "@/components/FolderItem";
import FileItem from "@/components/FileItem";
import AddFolder from "@/components/AddFolder";
import UploadFile from "@/components/UploadFile";

export default function Dashboard() {
  const folders = [
    { id: 1, name: "Projects" },
    { id: 2, name: "Images" },
    { id: 3, name: "Resume" }
  ];

  const files = [
    { id: 1, name: "design.png", type: "image/png" },
    { id: 2, name: "cv.pdf", type: "application/pdf" },
    { id: 3, name: "notes.txt", type: "text/plain" }
  ];

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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <FolderItem key={folder.id} name={folder.name} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Files</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {files.map((file) => (
            <FileItem key={file.id} name={file.name} type={file.type} />
          ))}
        </div>
      </section>
    </main>
  );
}
