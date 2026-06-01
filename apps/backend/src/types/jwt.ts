export type JwtPayload = {
  userId: string;
  role: "READER" | "AUTHOR";
}
