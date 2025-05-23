import { AiOutlineCloud } from "react-icons/ai";
import Header from "@/components/Header";
import FolderList from "@/components/FolderList";
import FileList from "@/components/FileList";
import AddFolder from "@/components/AddFolder";
import UploadFile from "@/components/UploadFile";

export default function Dashboard() {
  const rootParentId = null;

  return (
    <>
      <Header />
      <main className="p-6 max-w-6xl mx-auto">

        <div className="flex items-center justify-between mb-4">
          <AddFolder parentId={rootParentId} />
          <UploadFile parentId={null} />
        </div>

        <section className="mb-8">
              <h2 className="text-xl font-semibold mb-2">Folders</h2>
              <FolderList />
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Files</h2>
          <FileList folderId={rootParentId} />
        </section>
      </main>
    </>
  );
}
