export type Role = "STUDENT" | "TUTOR" | "ADMIN";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  image?: string;
  role: Role;
};

export type BetterAuthUser = {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  image?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
};

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    role: Role;
  };
}

export interface AuthSession {
  user: AuthUser;
}

export function isAuthUser(user: unknown): user is BetterAuthUser {
  if (!user || typeof user !== "object") return false;
  const u = user as Partial<BetterAuthUser>;

  return (
    typeof u.id === "string" &&
    typeof u.email === "string" &&
    typeof u.name === "string"
  );
}

export function hasRole(
  user: BetterAuthUser,
): user is BetterAuthUser & { role: Role } {
  return (
    user !== null &&
    user !== undefined &&
    typeof user.role === "string" &&
    ["STUDENT", "TUTOR", "ADMIN"].includes(user.role)
  );
}
