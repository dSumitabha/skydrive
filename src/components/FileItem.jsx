import {
    AiFillFilePdf,
    AiFillFileImage,
    AiFillFileText,
    AiFillFileUnknown
  } from "react-icons/ai";
  
  export default function FileItem({ name, type }) {
    let Icon = AiFillFileUnknown;
  
    if (type.includes("pdf")) Icon = AiFillFilePdf;
    else if (type.includes("image")) Icon = AiFillFileImage;
    else if (type.includes("text")) Icon = AiFillFileText;
  
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow transition cursor-pointer">
        <Icon className="text-4xl text-gray-600 mb-2" />
        <p className="text-sm font-medium break-words">{name}</p>
      </div>
    );
  }
  