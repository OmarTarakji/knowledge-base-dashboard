import { User } from "@/types/auth";
import { create } from "zustand/react";
import { randomDelay } from "@/lib/utils";
import {
  ServerFieldErrors,
  ServerValidationError,
} from "@/types/server-validation-error";
import { persist } from "zustand/middleware";

interface AuthStore {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;

  signup: (data: User) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isAuthenticated: false,

      signup: async (data) => {
        await randomDelay();
        const errors: ServerFieldErrors = {};
        get().users.forEach((user) => {
          if (user.email === data.email) errors.email = "emailExists";
          if (user.username.toLowerCase() === data.username.toLowerCase())
            errors.username = "usernameExists";
        });

        if (Object.keys(errors).length > 0)
          throw new ServerValidationError(errors);

        set((state) => ({
          users: [...state.users, data],
          currentUser: data,
          isAuthenticated: true,
        }));
      },

      login: async (username, password) => {
        await randomDelay();
        const user = get().users.find(
          (user) =>
            user.username.toLowerCase() === username.toLowerCase() &&
            user.password === password
        );

        if (!user)
          throw new ServerValidationError({
            root: "invalidCredentials",
          });
        set({
          currentUser: user,
          isAuthenticated: true,
        });
      },

      logout: async () => {
        await randomDelay();
        set({
          currentUser: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
