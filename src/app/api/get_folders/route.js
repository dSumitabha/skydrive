import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Folder from '@/models/Folder';
import { jwtVerify } from 'jose';

export async function GET(req) {
  try {
    await dbConnect();

    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

    const { searchParams } = new URL(req.url);
    const parentId = searchParams.get('parentId') || null;

    const folders = await Folder.find({
      user: payload.id,
      parentId: parentId // null means root-level
    }).sort({ createdAt: -1 });

    return NextResponse.json({ folders }, { status: 200 });
  } catch (error) {
    console.error('Fetch Folders Error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
} 
