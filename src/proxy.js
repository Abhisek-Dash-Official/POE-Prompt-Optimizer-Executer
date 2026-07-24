import { NextResponse } from 'next/server';
import { verifySession } from '@/lib/jwt';

export async function proxy(req) {
    const { pathname } = req.nextUrl;

    const isWorkspace = pathname.startsWith('/workspace');
    const isAdminRoute = pathname.startsWith('/admin') || pathname.startsWith('/api/admin');

    if (isWorkspace || isAdminRoute) {
        const token = req.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        const session = await verifySession(token);

        if (!session) {
            return NextResponse.redirect(new URL('/login', req.url));
        }

        if (isAdminRoute && session.role !== 'admin') {
            return NextResponse.redirect(new URL('/login', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/workspace/:path*', '/admin/:path*', '/api/admin/:path*'],
};