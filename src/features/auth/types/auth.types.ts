import type { User as BetterAuthUserType } from "better-auth";
export type Role = "STUDENT" | "TUTOR" | "ADMIN";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  image?: string;
  role: Role;
};

export type BetterAuthUser = BetterAuthUserType & {
  role: Role;
  phone?: string | null;
  isBanned?: boolean;
  status?: string | null;
};

// export interface BetterAuthUser {
//   id: string;
//   email: string;
//   name: string;
//   phone?: string | null;
//   image?: string | null;
//   emailVerified: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   role: Role;
//   isBanned?: boolean;
//   status?: string | null;
// }
export interface TutorProfile {
  id: string;
  bio?: string | null;
  hourlyRate: number;
  experience: number;
  avgRating: number;
  isApproved: boolean;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    role: Role;
  };
}

export interface AuthSession {
  user: AuthUser;
  tutorProfile?: TutorProfile | null;
}

// export function isAuthUser(user: unknown): user is BetterAuthUser {
//   if (!user || typeof user !== "object") return false;
//   const u = user as Partial<BetterAuthUser>;

//   return (
//     typeof u.id === "string" &&
//     typeof u.email === "string" &&
//     typeof u.name === "string"
//   );
// }
export function isAuthUser(user: unknown): user is BetterAuthUser {
  if (!user || typeof user !== "object") return false;

  const u = user as Record<string, unknown>;

  return (
    typeof u.id === "string" &&
    typeof u.email === "string" &&
    typeof u.name === "string" &&
    typeof u.emailVerified === "boolean" &&
    u.createdAt instanceof Date &&
    u.updatedAt instanceof Date &&
    (u.role === "STUDENT" || u.role === "TUTOR" || u.role === "ADMIN")
  );
}

export function hasRole(user: unknown): user is BetterAuthUser {
  return isAuthUser(user);
}

export function getValidRole(role: unknown): Role {
  if (role === "STUDENT" || role === "TUTOR" || role === "ADMIN") {
    return role;
  }
  return "STUDENT";
}
// export function hasRole(
//   user: BetterAuthUser,
// ): user is BetterAuthUser & { role: Role } {
//   return (
//     user !== null &&
//     user !== undefined &&
//     typeof user.role === "string" &&
//     ["STUDENT", "TUTOR", "ADMIN"].includes(user.role)
//   );
// }
