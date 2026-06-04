import type { JSONContent } from "@tiptap/core";

export type Post = {
  id: string;
  title: string;
  content: JSON;
  excerpt: string;
  slug: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  author: {
    username: string;
  };
};

export type CreatePostInput = {
  title: string;
  excerpt: string;
  content: JSONContent | null;
};

export type UpdatePostInput =
    CreatePostInput & {
        id: string;
    }

export type PostFormProps = {
  initialTitle?: string;
  initialExcerpt?: string;
  initialContent?: JSONContent;
  onSubmit: (data: CreatePostInput) => void;
  submitText: string;
  isPending: boolean;
};
