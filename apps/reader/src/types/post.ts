import type { JSONContent } from "@tiptap/react";
export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: JSONContent;

  createdAt: string;
  updatedAt: string;

  author: {
    id: string;
    username: string;
  };
};
