import { AiOutlineCloud } from "react-icons/ai";
import Header from "@/components/Header";
import FolderList from "@/components/FolderList";
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
    <>
      <Header />
      <main className="p-6 max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-4">
          <AddFolder />
          <UploadFile />
        </div>

        <section className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Folders</h2>
              <FolderList />
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
    </>
  );
}
