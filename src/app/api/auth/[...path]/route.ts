import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://skillbridge-api-tiua.onrender.com";

async function proxy(req: NextRequest, path: string[]) {
  const url = `${BACKEND}/api/auth/${path.join("/")}${req.nextUrl.search}`;

  const res = await fetch(url, {
    method: req.method,
    headers: {
      cookie: req.headers.get("cookie") || "",
      origin: req.headers.get("origin") || "",
      "content-type": req.headers.get("content-type") || "application/json",
    },
    body: req.method !== "GET" ? await req.text() : undefined,
  });

  const response = new NextResponse(res.body, {
    status: res.status,
  });

  const setCookie = res.headers.get("set-cookie");

  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxy(req, path);
}
