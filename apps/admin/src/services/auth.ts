const API_URL = "http://localhost:3000";

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

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
}

export async function getCurrentUser() {
  const token = localStorage.getItem("token");

  if(!token){
    return;
  }

  const response = await fetch(
    `${API_URL}/auth/me`,
    {
      headers:{
        Authorization: `Bearer ${token}`
      }
    }
  );

  if(!response.ok) {
    throw new Error("Unauthorized");
  }
  return response.json();
}
