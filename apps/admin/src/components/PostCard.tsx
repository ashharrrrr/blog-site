import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Post } from "@/types/post";
import { useNavigate } from "react-router-dom";

type PostCardProps = {
  post: Post;
  onPublish: (id:string) => void;
  onDelete: (id:string) => void;
};

export default function PostCard({ post, onPublish, onDelete }: PostCardProps) {
  const navigate = useNavigate();
  return (
    <li key={post.id} className="space-y-2">
      <Card onClick={() => navigate(`/posts/${post.id}`)} className="hover:cursor-pointer w-full max-w-5xl mx-auto space-y-2">
        <CardHeader className="flex justify-between items-start">
          <div>
            <CardTitle className="font-semibold text-lg">
              {post.title}
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString()
                : "Draft"}
            </CardDescription>
          </div>
          <Button
            className="hover:cursor-pointer hover:bg-gray-100 hover:text-zinc-700"
            variant="outline"
            size="sm"
            aria-label={`Edit post "${post.title}"`}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/posts/${post.id}/update`)
            }}>
            Edit
          </Button>
        </CardHeader>
        <CardContent className="text-gray-700 line-clamp-3">
          {post.excerpt.length > 150
            ? `${post.excerpt.slice(0, 150)}...`
            : post.excerpt}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/shiro.jpg" alt={post.author.username} />
            <AvatarFallback>{post.author.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex space-x-2">
            {!post.publishedAt && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onPublish(post.id)
                }}>
                Publish
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(post.id);
              }}
              aria-label={`Delete post "${post.title}"`}>
              Delete
            </Button>
          </div>
        </CardFooter>
      </Card>
    </li>
  );
}
