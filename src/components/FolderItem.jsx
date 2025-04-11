"use client";
import { useRouter } from "next/navigation";
import { AiFillFolder } from "react-icons/ai";

export default function FolderItem({ name, currentPath = [] }) {
  const router = useRouter();

  const handleClick = () => {
    const newPath = [...currentPath, name].join("/");
    router.push(`/folder/${newPath}`);
  };

  return (
    <div onClick={handleClick} className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow transition cursor-pointer">
      <AiFillFolder className="text-4xl text-blue-500 mb-2" />
      <p className="text-sm font-medium break-words">{name}</p>
    </div>
  );
}
