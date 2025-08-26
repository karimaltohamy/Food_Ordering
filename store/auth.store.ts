import { getCurrentUser } from "@/lib/appwrite";
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;

  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUser: (user: any) => void;
  setIsLoading: (isLoading: boolean) => void;

  fetchUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,

  setIsAuthenticated: (isAuthenticated) => set(() => ({ isAuthenticated })),
  setUser: (user) => set(() => ({ user })),
  setIsLoading: (isLoading) => set(() => ({ isLoading })),

  fetchUser: async () => {
    set({ isLoading: true });

    try {
      const user = await getCurrentUser();

      if (user) set({ isAuthenticated: true, user: user });
      else set({ isAuthenticated: false, user: null });
    } catch (e) {
      console.log("fetchAuthenticatedUser error", e);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuthStore;
