import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = `https://skillbridge-api-tiua.onrender.com${req.url?.replace(
    "/api/auth",
    "",
  )}`;

  const res = await fetch(url, {
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
    credentials: "include",
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
