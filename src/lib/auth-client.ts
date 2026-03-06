// import { env } from "@/env";
// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({
//   baseURL:
//     process.env.NODE_ENV === "production"
//       ? "https://skillbridge-api-tiua.onrender.com/api/auth"
//       : env.NEXT_PUBLIC_AUTH_URL || "http://localhost:5000/api/auth",
//   fetchOptions: {
//     credentials: "include",
//   },
// });

// // export const getCookieName = () => {
// //   return process.env.NODE_ENV === "production"
// //     ? "better-auth.session_token"
// //     : "better-auth.session_token";
// // };
// export const getCookieName = () => {
//   return "better-auth.session_token";
// };

// export const {
//   useSession,
//   signIn,
//   signUp,
//   signOut,
//   resetPassword,
//   verifyEmail,
// } = authClient;

import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://skillbridge-api-tiua.onrender.com/api/auth"
      : env.NEXT_PUBLIC_AUTH_URL || "http://localhost:5000/api/auth",
  fetchOptions: {
    credentials: "include", // ✅ include cookies
  },
});

export const getCookieName = () => "better-auth.session_token";

export const {
  useSession,
  signIn,
  signUp,
  signOut,
  resetPassword,
  verifyEmail,
} = authClient;
