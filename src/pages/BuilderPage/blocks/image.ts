import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import ImageView from './ImageView';

const dataAttr = (name: string) => ({
  default: '',
  parseHTML: (element: HTMLElement) =>
    element.getAttribute(`data-${name}`) ?? '',
  renderHTML: (attributes: Record<string, unknown>) => ({
    [`data-${name}`]: attributes[name],
  }),
});

export const Image = Node.create({
  name: 'image',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      src: dataAttr('src'),
      alt: dataAttr('alt'),
      href: dataAttr('href'),
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-block="image"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-block': 'image' })];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },
});
