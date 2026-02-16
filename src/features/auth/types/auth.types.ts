export type Role = "STUDENT" | "TUTOR" | "ADMIN";

export type User = {
  id: string;
  email: string;
  name?: string;
  phone: string;
  image?: string;
  role: Role;
  emailVerified: boolean;
  isBanned: boolean;
  createdAt: string;
  tutorProfile?: {
    id: string;
    bio?: string;
    hourlyRate: number;
    experience: number;
    avgRating: number;
    isApproved: boolean;
  };
};
export type BetterAuthResponse<T = unknown> = {
  data?: T;
  error?: {
    message: string;
    status: number;
  };
};

export type SessionResponse = BetterAuthResponse<{
  user: User;
  session: {
    id: string;
    expiresAt: string;
    token: string;
  };
}>;

export type AuthResponse<T = unknown> = BetterAuthResponse<T>;

export type SignInResponse = BetterAuthResponse<{
  user: User;
  session: unknown;
}>;
export type SignUpResponse = BetterAuthResponse<{
  user: User;
  session: unknown;
  token: string;
}>;
