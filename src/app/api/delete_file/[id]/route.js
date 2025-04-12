import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import File from "@/models/File";
import { jwtVerify } from "jose";
import fs from "fs/promises";
import path from "path";

export async function DELETE(req, { params }) {
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

    const fileId = params.id;

    const file = await File.findById(fileId);
    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    if (file.user.toString() !== payload.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }


    const filePath = path.join(process.cwd(), "storage", file.user.toString(), file.url.split("/").pop());

    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.warn("File not found on disk, skipping delete:", err.message);
    }

    await File.findByIdAndDelete(fileId);

    return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
  } catch (err) {
    console.error("Delete File Error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
