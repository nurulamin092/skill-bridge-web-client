// import { env } from "@/env";
// import { AuthSession } from "@/features/auth/types/auth.types";
// import { NextRequest } from "next/server";
// import { getCookieName } from "./auth-client";

// export async function getSessionFromCookie(
//   request: NextRequest,
// ): Promise<AuthSession | null> {
//   try {
//     const cookie = request.headers.get("cookie");
//     console.log("🍪 All cookies:", cookie);
//     console.log("🔍 Looking for:", getCookieName());

//     if (!cookie) {
//       console.log("❌ No cookie found");
//       return null;
//     }

//     const sessionUrl = `${env.NEXT_PUBLIC_AUTH_URL}/get-session`;

//     console.log("🔍 Fetching session from:", sessionUrl);

//     const response = await fetch(sessionUrl, {
//       method: "GET",
//       headers: {
//         Cookie: cookie,
//         "Content-Type": "application/json",
//       },
//       cache: "no-store",
//     });

//     if (!response.ok) {
//       console.log("❌ Session response not OK:", response.status);
//       return null;
//     }

//     const result = await response.json();
//     console.log("📦 Session result:", result);

//     // const userData = result?.user || result?.session?.user;
//     const userData = result?.session?.user;
//     if (!userData) {
//       console.log("❌ No user in session response");
//       return null;
//     }

//     return {
//       user: {
//         id: userData.id,
//         email: userData.email,
//         name: userData.name || "",
//         phone: userData.phone || "",
//         image: userData.image || "",
//         role: userData.role?.toUpperCase() || "STUDENT",
//       },
//     };
//   } catch (error) {
//     console.error("❌ Error in getSessionFromCookie:", error);
//     return null;
//   }
// }

import { env } from "@/env";
import { AuthSession } from "@/features/auth/types/auth.types";
import { NextRequest } from "next/server";
import { getCookieName } from "./auth-client";

export async function getSessionFromCookie(
  request: NextRequest,
): Promise<AuthSession | null> {
  try {
    const cookie = request.headers.get("cookie");
    console.log("🍪 All cookies:", cookie);
    console.log("🔍 Looking for:", getCookieName());

    if (!cookie) {
      console.log("❌ No cookie found");
      return null;
    }

    // const sessionUrl = `${env.NEXT_PUBLIC_AUTH_URL}/get-session`;
    const sessionUrl =
      process.env.NODE_ENV === "production"
        ? "/api/proxy/auth/get-session"
        : `${env.NEXT_PUBLIC_AUTH_URL}/get-session`;

    console.log("🔍 Fetching session from:", sessionUrl);

    const response = await fetch(sessionUrl, {
      method: "GET",
      headers: {
        Cookie: cookie,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.log("❌ Session response not OK:", response.status);
      return null;
    }

    const result = await response.json();
    console.log("📦 Session result:", result);

    const userData = result?.user || result?.session?.user;

    if (!userData) {
      console.log("❌ No user in session response");
      return null;
    }

    return {
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name || "",
        phone: userData.phone || "",
        image: userData.image || "",
        role: userData.role?.toUpperCase() || "STUDENT",
      },
    };
  } catch (error) {
    console.error("❌ Error in getSessionFromCookie:", error);
    return null;
  }
}
