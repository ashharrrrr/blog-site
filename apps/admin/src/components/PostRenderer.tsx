import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { JSONContent } from "@tiptap/core";

export default function PostRenderer({ content }: { content: JSONContent }) {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content,
  });

  return <EditorContent editor={editor} />;
}