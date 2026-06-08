const API_URL = "blog-site-production-b6e9.up.railway.app";
import type { Post, CreatePostInput, UpdatePostInput } from "@/types/post";

export async function getMyPosts(): Promise<Post[]> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/posts/mine`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function getSpecificPost(id: string): Promise<Post> {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/posts/mine/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
}

export async function createPost(input: CreatePostInput) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  return response.json();
}

export async function updatePost(input: UpdatePostInput) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/posts/${input.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: input.title,
      excerpt: input.excerpt,
      content: input.content,
      draftId: input.draftId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  return response.json();
}

export async function publishPost(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to publish post");
  }

  return response.json();
}

export async function deletePost(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  return response.json();
}
