import { ReactNode } from 'react';
import { NodeViewWrapper } from '@tiptap/react';

interface BlockFrameProps {
  children: ReactNode;
  popover?: ReactNode;
}

// Chrome of palette blocks: ⋮⋮ handle for ProseMirror drag and a settings popover, both on hover only.
const BlockFrame = ({ children, popover }: BlockFrameProps) => (
  <NodeViewWrapper className="builder-block">
    <div
      className="builder-block__handle"
      draggable="true"
      data-drag-handle
      title="Перетащить"
    >
      ⋮⋮
    </div>
    {children}
    {popover && (
      <div className="builder-block__popover">
        <div className="builder-block__popover-box">{popover}</div>
      </div>
    )}
  </NodeViewWrapper>
);

export default BlockFrame;
