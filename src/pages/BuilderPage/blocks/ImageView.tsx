import { NodeViewProps } from '@tiptap/react';

import BlockFrame from './BlockFrame';

const FIELDS = [
  { name: 'src', label: 'Картинка', placeholder: 'https://…/image.png' },
  { name: 'alt', label: 'Alt', placeholder: 'Описание картинки' },
  { name: 'href', label: 'Ссылка', placeholder: 'https://… (необязательно)' },
] as const;

const ImageView = (props: NodeViewProps) => {
  const { node, updateAttributes } = props;
  const src = String(node.attrs.src ?? '');
  const alt = String(node.attrs.alt ?? '');

  return (
    <BlockFrame
      view={props}
      popover={FIELDS.map(({ name, label, placeholder }) => (
        <label key={name}>
          {label}
          <input
            type="text"
            value={String(node.attrs[name] ?? '')}
            placeholder={placeholder}
            onChange={(e) => updateAttributes({ [name]: e.target.value })}
          />
        </label>
      ))}
    >
      {src ? (
        <img className="email-image" src={src} alt={alt} draggable={false} />
      ) : (
        <div className="email-image is-placeholder">Укажите URL картинки</div>
      )}
    </BlockFrame>
  );
};

export default ImageView;
