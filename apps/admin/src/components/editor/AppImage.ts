import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import UploadingImageNode from "./UploadingImageNode";

export const AppImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      imageId: {
        default: null,
      },
      uploading: {
        default: false,
      },
      uploadError: {
        default: null,
      },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(UploadingImageNode);
  },
});
