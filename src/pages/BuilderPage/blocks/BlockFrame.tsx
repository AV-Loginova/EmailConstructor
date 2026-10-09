import { ReactNode } from 'react';
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';

interface BlockFrameProps {
  view: NodeViewProps;
  children: ReactNode;
  popover?: ReactNode;
}

// The copy goes right after the block; a full container (a button row) gets a new one of its own.
const duplicate = ({ editor, node, getPos }: NodeViewProps) => {
  const pos = getPos();
  if (pos === undefined) return;
  const { state } = editor;
  const $pos = state.doc.resolve(pos);
  const after = pos + node.nodeSize;
  const index = $pos.index();
  const tr = state.tr;
  if ($pos.parent.canReplaceWith(index + 1, index + 1, node.type)) {
    tr.insert(after, node.copy(node.content));
  } else {
    const wrapper = $pos.parent.type.create(
      $pos.parent.attrs,
      node.copy(node.content)
    );
    tr.insert($pos.after(), wrapper);
  }
  editor.view.dispatch(tr.scrollIntoView());
};

// Chrome of palette blocks: ⋮⋮ handle for ProseMirror drag and a settings popover, both on hover only.
const BlockFrame = ({ view, children, popover }: BlockFrameProps) => (
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
    <div className="builder-block__popover" contentEditable={false}>
      <div className="builder-block__popover-box">
        {popover}
        <div className="builder-block__actions">
          <button type="button" onClick={() => duplicate(view)}>
            Дублировать
          </button>
          <button type="button" onClick={view.deleteNode}>
            Удалить
          </button>
        </div>
      </div>
    </div>
  </NodeViewWrapper>
);

export default BlockFrame;
