import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/db";
import File from "@/models/File";
import { createUserStorageDir } from "@/utils/createUserStorageDir";

export async function POST(req) {

  try {
    await dbConnect();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());


    const userStorageDir = await createUserStorageDir(payload.id);

    const filename = `${Date.now()}_${file.name}`;
    const filepath = path.join(userStorageDir, filename);

    await writeFile(filepath, buffer);

    const savedFile = await File.create({
      name: file.name,
      mimeType: file.type,
      size: file.size,
      url: `/api/file/${filename}`, 
      localPath: filepath,
      folderId: formData.get("folderId") || null,
      user: payload.id,
    });

    return NextResponse.json({ message: "File uploaded", file: savedFile }, { status: 201 });
  } catch (err) {
    console.error("Upload failed:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
