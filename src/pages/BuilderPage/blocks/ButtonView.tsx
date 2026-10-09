import { NodeViewProps } from '@tiptap/react';

import BlockFrame from './BlockFrame';

const ButtonView = ({ node, updateAttributes, deleteNode }: NodeViewProps) => {
  const text = String(node.attrs.text ?? '');
  const href = String(node.attrs.href ?? '');

  return (
    <BlockFrame
      popover={
        <label>
          URL
          <input
            type="text"
            value={href}
            placeholder="https://…"
            onChange={(e) => updateAttributes({ href: e.target.value })}
          />
        </label>
      }
    >
      <input
        className="email-button"
        aria-label="Текст кнопки"
        value={text}
        size={Math.max(text.length, 1)}
        onChange={(e) => updateAttributes({ text: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === 'Backspace' && !text) {
            e.preventDefault();
            deleteNode();
          }
        }}
      />
    </BlockFrame>
  );
};

export default ButtonView;
