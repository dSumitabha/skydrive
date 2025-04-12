import { AiFillFilePdf, AiFillFileImage, AiFillFileText, AiFillFileUnknown } from "react-icons/ai";
import Link from "next/link";

export default function FileItem({ name, type, id }) {
  let Icon = AiFillFileUnknown;

  if (type.includes("pdf")) Icon = AiFillFilePdf;
  else if (type.includes("image")) Icon = AiFillFileImage;
  else if (type.includes("text")) Icon = AiFillFileText;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow transition cursor-pointer">
      <Link href={`/api/download_file/${id}`} passHref>
        <div className="flex flex-col items-center">
          <Icon className="text-4xl text-gray-600 mb-2" />
          <p className="text-sm font-medium break-words">{name}</p>
        </div>
      </Link>
    </div>
  );
}