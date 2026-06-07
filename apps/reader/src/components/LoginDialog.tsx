import { useState } from "react";

import { useAuth } from "@/providers/AuthProvider";

export default function LoginDialog() {
  const {
    loginDialogOpen,
    closeLoginDialog,
    login,
    register,
  } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [displayName, setDispalyName] = useState("");
  const [bio, setBio] = useState("");

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

      if (mode === "login") {
        await login(
          username,
          password
        );
        return;
      }

      await register(
        username,
        password,
        displayName,
        bio,
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
          {mode === "login" ? "Login to Comment" : "Create Account"}
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

          {
            mode === "register" && (
              <input
                className="w-full rounded border p-2"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) =>
                  setDispalyName(
                    e.target.value
                  )
                }
              />
            )}
          {mode === "register" && (
            <input
              className="w-full rounded border p-2"
              placeholder="Bio"
              value={bio}
              onChange={(e) =>
                setBio(
                  e.target.value
                )
              }
            />
          )
          }

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
              {mode === "login"
                ? "Login"
                : "Register"}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center text-sm">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                className="font-medium text-orange-600"
                onClick={() =>
                  setMode(
                    "register"
                  )
                }
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="font-medium text-orange-600"
                onClick={() =>
                  setMode("login")
                }
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
