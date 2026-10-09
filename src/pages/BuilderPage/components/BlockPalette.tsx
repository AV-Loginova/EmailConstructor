import { DragEvent } from 'react';
import { Editor } from '@tiptap/core';
import { Fragment, Slice } from '@tiptap/pm/model';

import { PALETTE_BLOCKS, PaletteBlock } from '../blocks';

const DRAG_TYPE = 'application/x-builder-block';

interface BlockPaletteProps {
  editor: Editor;
}

// Hands the block to ProseMirror as an in-editor drag, so its drop cursor and drop handling
// place it between blocks exactly like a moved block.
const BlockPalette = ({ editor }: BlockPaletteProps) => {
  const startDrag = (e: DragEvent, block: PaletteBlock) => {
    const node = editor.schema.nodeFromJSON(block.content);
    const slice = new Slice(Fragment.from(node), 0, 0);
    e.dataTransfer.setData(DRAG_TYPE, block.title);
    e.dataTransfer.effectAllowed = 'copy';
    editor.view.dragging = { slice, move: false };
  };

  // A drag dropped outside the editor must not leave the slice behind for the next drop.
  const endDrag = () => {
    editor.view.dragging = null;
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="text-xs uppercase opacity-60 px-1">Блоки</div>
      {PALETTE_BLOCKS.map((block) => (
        <div
          key={block.title}
          className="card card-compact bg-base-200 cursor-grab select-none px-3 py-2 text-sm"
          draggable
          onDragStart={(e) => startDrag(e, block)}
          onDragEnd={endDrag}
        >
          {block.title}
        </div>
      ))}
    </div>
  );
};

export default BlockPalette;
