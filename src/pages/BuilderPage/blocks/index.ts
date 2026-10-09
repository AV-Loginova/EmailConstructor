import { AnyExtension, JSONContent } from '@tiptap/core';

import { Background } from './background';
import { Button, ButtonRow } from './button';
import { Image } from './image';

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
  {
    title: 'Картинка',
    extensions: [Image],
    content: { type: 'image', attrs: { src: '', alt: '', href: '' } },
  },
  {
    title: 'Фон',
    extensions: [Background],
    content: { type: 'background', content: [{ type: 'paragraph' }] },
  },
];
