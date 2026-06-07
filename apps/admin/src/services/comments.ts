import type { Comment } from "@/types/comment";
const API_URL = "http://localhost:3000"

export async function getCommentsByPostId(id: string): Promise<Comment[]> {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/posts/${id}/comments`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
}


export async function deleteComment(id: string) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/comments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok){
    throw new Error("Failed to delete comment")
  }

  return response.json();
}
