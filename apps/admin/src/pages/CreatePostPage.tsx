import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createPost } from "@/services/posts";
import PostForm from "@/components/PostForm";

export default function CreatePostPage() {
  const navigate = useNavigate();

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      console.log("success");
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
        </CardHeader>

        <CardContent>
          <PostForm
            submitText="Create post"
            isPending={createPostMutation.isPending}
            onSubmit={(data) => {
              createPostMutation.mutate(data);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
