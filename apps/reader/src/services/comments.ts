import type { Comment } from "@/types/comment";

const API_URL = "https://blog-site-production-b6e9.up.railway.app";

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  const response = await fetch(`${API_URL}/posts/${postId}/comments`);

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
}

export async function postComment(postId: string, comment: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      comment,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to post comment");
  }

  return response.json();
}
