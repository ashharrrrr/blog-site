import { useEffect, useRef } from "react";
import type { JSONContent } from "@tiptap/core";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  Redo2,
  Undo2,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { AppImage } from "./editor/AppImage";
import {
  completeImageUpload,
  requestImageUpload,
  uploadFileToSupabase,
} from "@/services/uploads";

type TextEditorProps = {
  draftId: string;
  content: JSONContent;
  onChange: (content: JSONContent) => void;
};

function updateImageNodeById(
  editor: Editor,
  imageId: string,
  attrs: Record<string, unknown>
) {
  const { state, view } = editor;

  let foundPos: number | null = null;
  let foundNodeAttrs: Record<string, unknown> = {};

  state.doc.descendants((node, pos) => {
    if (node.type.name === "image" && node.attrs.imageId === imageId) {
      foundPos = pos;
      foundNodeAttrs = node.attrs;
      return false;
    }

    return true;
  });

  if (foundPos === null) return;

  const tr = state.tr.setNodeMarkup(foundPos, undefined, {
    ...foundNodeAttrs,
    ...attrs,
  });

  view.dispatch(tr);
}

export default function TextEditor({
  draftId,
  content,
  onChange,
}: TextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const startImageUploadMutation = useMutation({
    mutationFn: requestImageUpload,
  });

  const completeImageUploadMutation = useMutation({
    mutationFn: completeImageUpload,
  });

  const editor = useEditor({
    extensions: [StarterKit, AppImage],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  async function handleFileSelect(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file || !editor) return;

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      alert("Only JPG, PNG, WEBP, and GIF are allowed.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("Image must be smaller than 5MB.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    const presign = await startImageUploadMutation.mutateAsync({
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
      draftId,
    });

    editor.chain().focus().setImage({
      src: previewUrl,
      alt: file.name,
      title: file.name,
      imageId: presign.imageId,
      uploading: true,
      uploadError: null,
    } as never).run();

    try {
      await uploadFileToSupabase(presign, file);
      await completeImageUploadMutation.mutateAsync(presign.imageId);

      updateImageNodeById(editor, presign.imageId, {
        src: presign.publicUrl,
        uploading: false,
        uploadError: null,
      });

      URL.revokeObjectURL(previewUrl);
    } catch (error) {
      console.error(error);

      updateImageNodeById(editor, presign.imageId, {
        uploading: false,
        uploadError: "Upload failed",
      });
    }
  }

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="flex flex-wrap gap-2 border-b bg-muted/40 p-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}
        >
          <Undo2 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Redo2 className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImagePlus className="h-4 w-4" />
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      <EditorContent
        editor={editor}
        className="min-h-[300px] p-4 focus:outline-none"
      />
    </div>
  );
}
