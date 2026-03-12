import { env } from "@/env";
import { NextRequest, NextResponse } from "next/server";

const BACKEND = env.BACKEND_URL || "http://localhost:5000";

async function proxy(req: NextRequest, path: string[]) {
  let url: string;

  if (path[0] === "auth") {
    url = `${BACKEND}/api/${path.join("/")}${req.nextUrl.search}`;
  } else {
    url = `${BACKEND}/api/v1/${path.join("/")}${req.nextUrl.search}`;
  }

  const originHeader = req.headers.get("origin") || env.NEXT_PUBLIC_APP_URL;

  const res = await fetch(url, {
    method: req.method,
    headers: {
      cookie: req.headers.get("cookie") || "",
      "content-type": req.headers.get("content-type") || "application/json",
      origin: originHeader,
    },
    body: req.method !== "GET" ? await req.text() : undefined,
    credentials: "include",
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

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxy(req, path);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxy(req, path);
}
