import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { JSONContent } from "@tiptap/core";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import TextEditor from "@/components/TextEditor";
import { createPost } from "@/services/posts";

export default function CreatePostPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState<JSONContent | null>(null);

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      console.log("success");
      navigate("/");
    },
    onError: (error) => {
        console.log(error);
    }
  });

  function handleFormAction() {

    createPostMutation.mutate({
      title,
      excerpt,
      content,
    });
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={handleFormAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Short preview text"
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <TextEditor onChange={setContent} />
            </div>

            <Button type="submit" disabled={createPostMutation.isPending}>
              {createPostMutation.isPending ? "Saving..." : "Save Draft"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
