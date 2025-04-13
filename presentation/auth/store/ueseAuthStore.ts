import { create } from "zustand";
import { User } from "@/core/auth/interface/user";

export type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated"
  | "checking";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
  checkstatus: () => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set) => ({
  // Properties
  status: "checking",
  token: undefined,
  user: undefined,

  // Actions
  login: async (email: string, password: string) => {
    return true;
  },

  checkstatus: async () => {
    return true;
  },
  logout: async () => {},
}));
