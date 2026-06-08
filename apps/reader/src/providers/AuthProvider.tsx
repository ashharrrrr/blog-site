import { createContext, useContext, useEffect, useState } from "react";

import {
  login as loginRequest,
  register as registerRequest,
} from "@/services/auth";

import type { ReactNode } from "react";

const API_URL = "blog-site-production-b6e9.up.railway.app";

type User = {
  id: string;
  username: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;

  loginDialogOpen: boolean;

  openLoginDialog: () => void;
  closeLoginDialog: () => void;

  login: (username: string, password: string) => Promise<void>;

  register: (
    username: string,
    password: string,
    displayName: string,
    bio: string,
  ) => Promise<void>;

  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  async function fetchMe(token: string) {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem("token");
      return;
    }

    const data = await response.json();

    setUser(data);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    fetchMe(token);
  }, []);

  async function login(username: string, password: string) {
    const data = await loginRequest(username, password);

    localStorage.setItem("token", data.token);

    await fetchMe(data.token);

    setLoginDialogOpen(false);
  }

  async function register(
    username: string,
    password: string,
    displayName: string,
    bio: string,
  ) {
    const data = await registerRequest(username, password, displayName, bio);

    localStorage.setItem("token", data.token);

    await fetchMe(data.token);

    setLoginDialogOpen(false);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,

        loginDialogOpen,

        openLoginDialog: () => setLoginDialogOpen(true),

        closeLoginDialog: () => setLoginDialogOpen(false),

        login,
        register,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
