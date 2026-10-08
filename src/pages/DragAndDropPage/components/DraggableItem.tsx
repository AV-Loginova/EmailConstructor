import React from 'react';
import { useDrag } from 'react-dnd';

import { BlockDefinition } from './blockLibrary';

type DraggableItemProps = {
  block: BlockDefinition;
};

const DraggableItem: React.FC<DraggableItemProps> = ({ block }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'PALETTE_BLOCK',
    item: { kind: 'palette-block', blockType: block.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <button
      ref={dragRef}
      type="button"
      className="w-full rounded-[1.5rem] border border-base-300 bg-base-100 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
      style={{ opacity: isDragging ? 0.45 : 1 }}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {block.badge}
        </span>
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: block.accent }}
        />
      </div>
      <h3 className="mb-1 text-base font-semibold text-base-content">
        {block.label}
      </h3>
      <p className="text-sm leading-5 text-base-content/70">
        {block.description}
      </p>
    </button>
  );
};

export default DraggableItem;
