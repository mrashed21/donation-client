export interface SessionResponse {
  user: User | null;
}

// types/user.types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  role: "user" | "admin";
  status: "active" | "inactive" | "pending";
  is_blocked: boolean;
  profile_completed: boolean;
}
