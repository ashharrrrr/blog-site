import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";

const API_URL = "http://localhost:3000";

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

  login: (
    username: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loginDialogOpen, setLoginDialogOpen] =
    useState(false);

  async function fetchMe(token: string) {
    const response = await fetch(
      `${API_URL}/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      localStorage.removeItem("token");
      return;
    }

    const data = await response.json();

    setUser(data);
  }

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) return;

    fetchMe(token);
  }, []);

  async function login(
    username: string,
    password: string
  ) {
    const response = await fetch(
      `${API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();

    localStorage.setItem(
      "token",
      data.token
    );

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

        openLoginDialog: () =>
          setLoginDialogOpen(true),

        closeLoginDialog: () =>
          setLoginDialogOpen(false),

        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
}
