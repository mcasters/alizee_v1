import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// import { withAuth } from "next-auth/middleware";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!session && path === "/admin") {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (session && path === "/login") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  return NextResponse.next();
}

/*

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/admin") {
        return token?.userRole === "admin"
      }
      // `/me` only requires the user to be logged in
      return !!token
    },
  },
})

export const config = { matcher: ["/admin", "/me"] }

 */
