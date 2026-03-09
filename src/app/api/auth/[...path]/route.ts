// import { NextRequest, NextResponse } from "next/server";

// const BACKEND = "https://skillbridge-api-tiua.onrender.com";

// async function proxy(req: NextRequest, path: string[]) {
//   const url = `${BACKEND}/api/auth/${path.join("/")}${req.nextUrl.search}`;

//   const res = await fetch(url, {
//     method: req.method,
//     headers: {
//       cookie: req.headers.get("cookie") || "",
//       "content-type": req.headers.get("content-type") || "application/json",
//       origin: req.headers.get("origin") || "",
//       referer: req.headers.get("referer") || "",
//     },
//     body: req.method !== "GET" ? await req.text() : undefined,
//   });

//   const headers = new Headers(res.headers);
//   headers.delete("content-encoding");
//   headers.delete("content-length");

//   return new NextResponse(res.body, {
//     status: res.status,
//     headers,
//   });
// }

// export async function GET(
//   req: NextRequest,
//   context: { params: Promise<{ path: string[] }> },
// ) {
//   const { path } = await context.params;
//   return proxy(req, path);
// }

// export async function POST(
//   req: NextRequest,
//   context: { params: Promise<{ path: string[] }> },
// ) {
//   const { path } = await context.params;
//   return proxy(req, path);
// }

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

  const responseHeaders = new Headers();

  // --- সমাধানের মূল অংশ ---
  // আমরা শুধুমাত্র নিরাপদ হেডারগুলো কপি করব।
  // content-encoding এবং content-length কপি করলে ব্রাউজার ERR_CONTENT_DECODING_FAILED দিবে।
  res.headers.forEach((value, key) => {
    if (
      key !== "content-encoding" && // ব্লক করতে হবে
      key !== "content-length" && // ব্লক করতে হবে
      key !== "transfer-encoding" &&
      key !== "connection" &&
      key !== "keep-alive" &&
      key !== "set-cookie" // কুকি আলাদাভাবে প্রসেস হবে
    ) {
      responseHeaders.append(key, value);
    }
  });

  // --- কুকি প্রসেসিং (Domain রিমুভ) ---
  const cookies = res.headers.getSetCookie();
  if (cookies.length > 0) {
    cookies.forEach((cookie) => {
      // ব্যাকএন্ডের ডোমেইন রিমুভ করে ব্রাউজারকে নিজের ডোমেইনে কুকি সেট করতে দিন
      const modifiedCookie = cookie.replace(/Domain=([^;]+);?/gi, "");
      responseHeaders.append("set-cookie", modifiedCookie);
    });
  }

  return new NextResponse(res.body, {
    status: res.status,
    headers: responseHeaders,
  });
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
