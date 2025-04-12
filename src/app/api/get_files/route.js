import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import File from '@/models/File';
import { jwtVerify } from 'jose';

export async function GET(req) {
  try {
    await dbConnect();

    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const { searchParams } = new URL(req.url);
    const hasFolderId = searchParams.has('folderId');
    const folderId = searchParams.get('folderId') || null;

    let files;
    if (hasFolderId) {
      files = await File.find({ user: payload.id, folderId }).sort({ createdAt: -1 });
    } else {
      files = await File.find({ user: payload.id, folderId: null }).sort({ createdAt: -1 });
    }

    return NextResponse.json({ files }, { status: 200 });
  } catch (error) {
    console.error('Fetch Files Error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
