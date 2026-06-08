import type { Post } from "@/types/post";

const API_URL = "https://blog-site-production-b6e9.up.railway.app";

export async function getPublishedPosts(): Promise<Post[]> {
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const response = await fetch(`${API_URL}/posts/${slug}`);

  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }

  const data = await response.json();

  return data.post;
}
