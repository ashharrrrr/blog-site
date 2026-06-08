import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { register } from "@/services/auth";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: () =>
      register(
        username,
        password,
        displayName,
        bio,
      ),

    onSuccess: (data) => {
      localStorage.setItem(
        "token",
        data.token,
      );

      navigate("/");
    },

    onError: (error) => {
      console.error(error);
    },
  });

  function handleSubmit() {
    registerMutation.mutate();
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>

          <CardDescription>
            Register a new account
          </CardDescription>

          <CardAction>
            <Button
              variant="link"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">
                  Username
                </Label>

                <Input
                  id="username"
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="displayName">
                  Display Name
                </Label>

                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) =>
                    setDisplayName(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bio">
                  Bio
                </Label>

                <Input
                  id="bio"
                  value={bio}
                  onChange={(e) =>
                    setBio(
                      e.target.value
                    )
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={
              registerMutation.isPending
            }
          >
            {registerMutation.isPending
              ? "Creating account..."
              : "Register"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}