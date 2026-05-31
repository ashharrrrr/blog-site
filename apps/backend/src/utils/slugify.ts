import crypto from "crypto";

export function slugify(title: string) {
  const slug = `${title.toLowerCase().trim().replaceAll(" ", "-")}-${crypto.randomUUID()}`;
  return slug;
}
