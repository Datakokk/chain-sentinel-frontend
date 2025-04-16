import { create } from "zustand";
import { User } from "@/core/auth/interface/user";
import { authCkeckStatus, authLogin } from "@/core/auth/actions/auth-actions";

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
  checkstatus: () => Promise<void>;
  logout: () => Promise<void>;

  changeStatus: (token?: string, user?: User) => boolean;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Properties
  status: "checking",
  token: undefined,
  user: undefined,

  // Actions
  changeStatus: (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });

      // TODO call logout
      return false;
    }

    set({ status: "authenticated", token: token, user: user });

    return true;
  },

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    return get().changeStatus(resp?.token, resp?.user);
  },

  checkstatus: async () => {
    const resp = await authCkeckStatus();

    get().changeStatus(resp?.token, resp?.user);
  },
  logout: async () => {
    // TODO remove token from local storage
    set({ status: "unauthenticated", token: undefined, user: undefined });
    // TODO remove token from local storage
  },
}));
