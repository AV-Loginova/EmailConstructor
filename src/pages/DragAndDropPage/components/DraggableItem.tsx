// components/DraggableItem.tsx
import React from 'react';
import { useDrag } from 'react-dnd';

type DraggableItemProps = {
  name: string;
};

const DraggableItem: React.FC<DraggableItemProps> = ({ name }) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'BOX',
    item: { name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const style: React.CSSProperties = {
    padding: '0.5rem 1rem',
    margin: '0.5rem',
    backgroundColor: isDragging ? '#aaa' : '#f0f0f0',
    border: '1px solid #999',
    cursor: 'move',
  };

  return (
    <div ref={dragRef} style={style}>
      {name}
    </div>
  );
};

export default DraggableItem;
