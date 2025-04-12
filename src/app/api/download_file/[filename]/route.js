import { createReadStream } from "fs";
import { stat } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/db";
import File from "@/models/File";

export async function GET(req, context) {
	try {
	  console.log("GET /api/download_file/[filename]");
	  await dbConnect();
  
	  const { filename } = await context.params;
  
	  const token = req.cookies.get("token")?.value;
	  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  
	  const { payload } = await jwtVerify(
		token,
		new TextEncoder().encode(process.env.JWT_SECRET)
	  );
  
	  const file = await File.findById(filename);

		console.log(file.user.toString(), payload.id);

	  if (!file || file.user.toString() !== payload.id) {
		return NextResponse.json({ error: "Not authorized" }, { status: 403 });
	  }


	  const filenameOnDisk = file.url.split("/").pop();
	  const filePath = path.join(process.cwd(), "storage", file.user.toString(), filenameOnDisk);
		console.log("File path:", filePath);
  
	  const fileStat = await stat(filePath);
	  const fileStream = createReadStream(filePath);
  
	  return new Response(fileStream, {
		status: 200,
		headers: {
		  "Content-Type": file.mimeType,
		  "Content-Length": fileStat.size,
		  "Content-Disposition": `inline; filename="${file.name}"`,
		},
	  });
	} catch (err) {
	  console.error("Download error:", err);
	  return NextResponse.json({ error: "File not found or unauthorized" }, { status: 404 });
	}
}