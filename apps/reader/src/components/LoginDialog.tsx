import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";

export default function LoginDialog() {
  const {
    loginDialogOpen,
    closeLoginDialog,
    login,
  } = useAuth();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  if (!loginDialogOpen) {
    return null;
  }

  async function handleSubmit(
    e: React.SyntheticEvent
  ) {
    e.preventDefault();

    try {
      setError("");

      await login(
        username,
        password
      );
    } catch {
      setError(
        "Invalid username or password"
      );
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            className="w-full rounded border p-2"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          <input
            type="password"
            className="w-full rounded border p-2"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={
                closeLoginDialog
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded bg-black px-4 py-2 text-white"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
