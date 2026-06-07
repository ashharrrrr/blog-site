export type Comment = {
  id: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  userId: string;
  user: {
    username: string;
  }
}
