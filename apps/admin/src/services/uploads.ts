import type {
  PresignImageInput,
  PresignImageResponse,
} from "@/types/imageUpload";

const API_URL = "blog-site-production-b6e9.up.railway.app";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET;

export async function requestImageUpload(
  input: PresignImageInput,
): Promise<PresignImageResponse> {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/uploads/images/presign`, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({ input }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Could not start image upload");
  }

  return data;
}

export async function uploadFileToSupabase(
  upload: PresignImageResponse,
  file: File,
) {
  const response = await fetch(
    `${SUPABASE_URL}/storage/v1/object/upload/sign/${SUPABASE_BUCKET}/${upload.storagePath}?token=${upload.token}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },

      body: file,
    },
  );

  if (!response.ok) {
    throw new Error("Supabase upload failed");
  }

  return response;
}

export async function completeImageUpload(imageId: string) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/uploads/images/complete`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ imageId }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message ?? "Could not complete image upload");
  }

  return data;
}
