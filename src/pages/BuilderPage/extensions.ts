import { Extension, wrappingInputRule } from '@tiptap/core';
import Bold from '@tiptap/extension-bold';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import {
  BulletList,
  bulletListInputRegex,
  ListItem,
} from '@tiptap/extension-list';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { Placeholder, UndoRedo } from '@tiptap/extensions';

import { NodeId } from './nodeId';
import { Variable } from './variable';

// The snippet's list has no markers; «disc» is the opt-in bulleted variant.
const StyledBulletList = BulletList.extend({
  addAttributes() {
    return {
      listStyle: {
        default: 'none',
        parseHTML: (element) =>
          element.getAttribute('data-list-style') === 'disc' ? 'disc' : 'none',
        renderHTML: (attributes) => ({
          'data-list-style': attributes.listStyle,
        }),
      },
    };
  },
  // «- » creates a plain list and must not merge into a neighbouring bulleted one.
  addInputRules() {
    return [
      wrappingInputRule({
        find: bulletListInputRegex,
        type: this.type,
        joinPredicate: (_match, node) => node.attrs.listStyle === 'none',
      }),
    ];
  },
});

// No nested lists: email list items hold paragraphs only.
const FlatListItem = ListItem.extend({ content: 'paragraph+' });

// Hrefs often carry Kommo variables ({{profile.phone}}?utm…), so only script URLs are rejected.
const isSafeHref = (href: string) =>
  !/^\s*(javascript|vbscript|data):/i.test(href);

export const builderExtensions = (onEditLink: () => void) => [
  Document,
  Paragraph,
  Text,
  Heading.configure({ levels: [2] }),
  StyledBulletList,
  FlatListItem,
  Variable,
  NodeId,
  Bold,
  Link.configure({
    openOnClick: false,
    autolink: false,
    isAllowedUri: isSafeHref,
  }),
  UndoRedo,
  Placeholder.configure({ placeholder: 'Начните писать письмо…' }),
  Extension.create({
    name: 'linkShortcut',
    addKeyboardShortcuts: () => ({
      'Mod-k': () => {
        onEditLink();
        return true;
      },
    }),
  }),
];
