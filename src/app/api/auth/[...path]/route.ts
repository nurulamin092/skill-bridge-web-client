import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://skillbridge-api-tiua.onrender.com";

async function proxy(req: NextRequest, path: string[]) {
  const url = `${BACKEND}/api/auth/${path.join("/")}${req.nextUrl.search}`;

  const res = await fetch(url, {
    method: req.method,
    headers: {
      cookie: req.headers.get("cookie") || "",
      "content-type": req.headers.get("content-type") || "application/json",
      origin: req.headers.get("origin") || "",
      referer: req.headers.get("referer") || "",
    },
    body: req.method !== "GET" ? await req.text() : undefined,
  });

  const headers = new Headers(res.headers);

  headers.delete("content-encoding");
  headers.delete("content-length");

  return new NextResponse(res.body, {
    status: res.status,
    headers,
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxy(req, params.path);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } },
) {
  return proxy(req, params.path);
}
