import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";

type HeaderBarProps = {
  username: string;
  handleLogout: () => void;
};

export default function HeaderBar({ username, handleLogout }: HeaderBarProps) {
  const navigate = useNavigate();
  return (
    <header className="bg-card sticky top-0 z-50 border-b mb-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <div>
          <h1 className="text-xl font-semibold">
            <span className="font-extrabold text-3xl">
              {username ?? "User"}'s Blogs
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate("/posts/new")}
            variant="secondary"
            size="lg"
            className="bg-green-800 text-amber-50 hover:bg-green-900 hover:cursor-pointer">
            <span>+</span>
            <Separator orientation="vertical" />
            New Post
          </Button>
          <Button variant="outline" size="sm">
            All Posts
          </Button>

          <Button variant="outline" size="sm">
            Published
          </Button>

          <Button variant="outline" size="sm">
            Drafts
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className={"cursor-pointer rounded-full"}>
              <Avatar className="h-8 w-8">
                <AvatarImage src="shiro.jpg" alt={username} />
                <AvatarFallback>
                  {(username ?? "US").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
