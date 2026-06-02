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
    content: JSONContent | null
}