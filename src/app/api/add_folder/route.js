import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Folder from '@/models/Folder';
import { jwtVerify } from 'jose';

export async function POST(req) {
  try {
    await dbConnect();

    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    const { name, parentId } = await req.json();

    if (!name) return NextResponse.json({ error: 'Folder name is required' }, { status: 400 });

    const newFolder = await Folder.create({
      name,
      user: payload.id,
      parentId: parentId || null
    });

    return NextResponse.json({ message: 'Folder created successfully', folder: newFolder }, { status: 201 });
  } catch (error) {
    console.error('Folder Creation Error:', error);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
