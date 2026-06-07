export type PresignImageInput = {
  fileName: string;
  mimeType: string;
  size: number;
  draftId: string;
};

export type PresignImageResponse = {
  imageId: string;
  storagePath: string;
  token: string;
  publicUrl: string;
};
