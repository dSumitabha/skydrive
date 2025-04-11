import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';


const middleware = async (request) => {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, or authentication page
  if (
    pathname.startsWith('/api') || pathname.startsWith('/authentication') 
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/authentication', request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/authentication', request.url));
  }
};

export const config = {
  matcher: ['/', '/dashboard/:path*'],
};

export default middleware;
