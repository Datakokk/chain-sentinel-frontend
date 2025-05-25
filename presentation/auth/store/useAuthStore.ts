import { create } from "zustand";
import { User } from "@/core/auth/interface/user";
import {
  authCkeckStatus,
  authLogin,
  authLogout,
} from "@/core/auth/actions/auth-actions";
import { SecureStorageAdapter } from "@/helpers/adapters/secure-storage.adapters";

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

  changeStatus: (token?: string, user?: User) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  // Properties
  status: "checking",
  token: undefined,
  user: undefined,

  // Actions
  changeStatus: async (token?: string, user?: User) => {
    if (!token || !user) {
      set({ status: "unauthenticated", token: undefined, user: undefined });

      await SecureStorageAdapter.deleteItem("token");
      return false;
    }

    set({ status: "authenticated", token: token, user: user });
    console.log(token);
    await SecureStorageAdapter.setItem("token", token);

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
    await authLogout();
    SecureStorageAdapter.deleteItem("token");
    set({ status: "unauthenticated", token: undefined, user: undefined });
  },
}));
