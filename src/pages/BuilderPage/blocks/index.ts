import { AnyExtension, JSONContent } from '@tiptap/core';

import { Button, ButtonRow } from './button';

export interface PaletteBlock {
  title: string;
  extensions: AnyExtension[];
  // What a drop from the palette inserts.
  content: JSONContent;
}

// Adding a block = one entry here plus its case in compile.
export const PALETTE_BLOCKS: PaletteBlock[] = [
  {
    title: 'Кнопка',
    extensions: [ButtonRow, Button],
    content: {
      type: 'buttonRow',
      content: [{ type: 'button', attrs: { text: 'Кнопка', href: '' } }],
    },
  },
];
