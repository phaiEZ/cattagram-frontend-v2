import { NextRequest, NextResponse } from "next/server";
import cookie from "cookie";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function middleware(req: NextRequest) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const token = cookies.token;

  const url = req.nextUrl.clone();

  if (!token) {
    console.log("No token found");
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  const verifyUrl = new URL(`${apiBaseUrl}/auth/profile`, req.url);
  const response = await fetch(verifyUrl.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.log("Token verification failed");
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
