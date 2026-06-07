import { EditorContent, useEditor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

type Props = {
  content: JSONContent;
};

export default function PostContent({
  content,
}: Props) {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      Image,
    ],
    content,
  });

  return (
    <EditorContent editor={editor} />
  );
}
