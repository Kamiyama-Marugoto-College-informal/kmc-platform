import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: string;
};
