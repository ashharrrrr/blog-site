import type { PostFormProps } from "@/types/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TextEditor from "./TextEditor";
import { useState } from "react";
import type { JSONContent } from "@tiptap/react";

const EMPTY_DOC : JSONContent = {
    type: "doc",
    content: [],
}

export default function PostForm({
  initialTitle = "",
  initialExcerpt = "",
  initialContent = EMPTY_DOC,
  submitText,
  isPending = false,
  onSubmit,
}: PostFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [content, setContent] = useState<JSONContent>(initialContent);

  console.log("CONTENT", content)

  function handleFormAction(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit({
      title,
      excerpt,
      content,
    });
  }

  return (
    <form
      onSubmit={handleFormAction}
      className="mx-auto max-w-4xl space-y-6"
    >
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>

        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My awesome post"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>

        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short summary..."
        />
      </div>

      <div className="space-y-2">
        <Label>Content</Label>

        <TextEditor
          content={content}
          onChange={setContent}
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
      >
        {isPending ? "Saving..." : submitText}
      </Button>
    </form>
  );
}