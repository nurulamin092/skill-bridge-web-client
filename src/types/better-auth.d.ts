import type { Role } from "@/features/auth/types/auth.types";

declare module "better-auth" {
  interface User {
    role: Role;
    phone?: string | null;
    isBanned?: boolean;
    status?: string | null;
  }
}
