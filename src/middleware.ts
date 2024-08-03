import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";
import { verifyToken } from "./utils/jwt"; // Ensure the correct path

export function middleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const token = cookies.token;

  const url = req.nextUrl.clone();

  // console.log("Token from cookie:", token);

  if (!token) {
    console.log("No token found");
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*", "/", "/profile"],
};
