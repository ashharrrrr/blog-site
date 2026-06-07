import { useParams, useNavigate } from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getSpecificPost, updatePost } from "@/services/posts";
import PostForm from "@/components/PostForm";

export default function CreatePostPage() {

  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getSpecificPost(id!),
    enabled: !!id,
  });

  const queryClient = useQueryClient();

  const updatePostMutation = useMutation({
    mutationFn:  updatePost,
    onSuccess: async () => {
        console.log("success")
        await queryClient.invalidateQueries({
            queryKey: ["post", id]
        })
        navigate(`/posts/${id}`)
    },
    onError: (error) => {
      console.log("ERROR", error);
    },
  })

  console.log(post);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load post</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Update Post</CardTitle>
        </CardHeader>

        <CardContent>
            <PostForm 
                draftId={post.id}
                initialTitle={post.title}
                initialExcerpt={post.excerpt}
                initialContent={post.content}
                submitText="Update Post"
                isPending={updatePostMutation.isPending}
                onSubmit={(data) => {
                    updatePostMutation.mutate({
                        id: post.id,
                        ...data,
                    })
                }}
            />
        </CardContent>
      </Card>
    </div>
  );
}
