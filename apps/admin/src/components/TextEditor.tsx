import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";
import type { JSONContent } from "@tiptap/core";
import { Placeholder } from "@tiptap/extensions";

type TextEditorProps = {
  onChange: (content: JSONContent) => void;
};

export default function TextEditor({ onChange }: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit,
        Placeholder.configure({
            placeholder: "Start writing...",
            emptyEditorClass: 'is-editor-empty'
        }),
    ],
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  useEffect(() => {
    if (editor) {
      onChange(editor.getJSON());
    }
  }, [editor, onChange]);

  if (!editor) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="flex flex-wrap gap-2 border-b bg-muted/40 p-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          Bullet list
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          Ordered list
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </Button>
      </div>

      <EditorContent
        editor={editor}
        className="min-h-64 p-4 focus:outline-none"
      />
    </div>
  );
}
