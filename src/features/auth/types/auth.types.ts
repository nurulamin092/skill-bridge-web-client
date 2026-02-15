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

export type SessionResponse = {
  data?: {
    user?: User;
  };
};
