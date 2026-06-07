import type { NodeViewProps } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { Loader2, TriangleAlert } from "lucide-react";

type ImageAttrs = {
  src: string;
  alt?: string | null;
  title?: string | null;
  imageId?: string | null;
  uploading?: boolean;
  uploadError?: string | null;
};

export default function UploadingImageNode({ node }: NodeViewProps) {
  const attrs = node.attrs as ImageAttrs;

  return (
    <NodeViewWrapper as="figure" className="my-4">
      <div className="relative inline-block max-w-full overflow-hidden rounded-xl border">
        <img
          src={attrs.src}
          alt={attrs.alt ?? attrs.title ?? ""}
          className={`block max-w-full ${
            attrs.uploading ? "blur-sm opacity-70" : ""
          }`}
        />

        {attrs.uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/60">
            <div className="flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm shadow">
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading
            </div>
          </div>
        )}

        {attrs.uploadError && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="flex items-center gap-2 rounded-full border border-red-500 bg-background px-3 py-1 text-sm text-red-600 shadow">
              <TriangleAlert className="h-4 w-4" />
              Upload failed
            </div>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
}
