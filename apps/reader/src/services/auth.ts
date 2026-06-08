const API_URL = "blog-site-production-b6e9.up.railway.app";

export type AuthUser = {
  id: string;
  username: string;
  role: string;
};

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Login failed");
  }

  return data;
}

export async function register(
  username: string,
  password: string,
  displayName: string,
  bio: string,
) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      displayName,
      bio,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Registration failed");
  }

  return data;
}
