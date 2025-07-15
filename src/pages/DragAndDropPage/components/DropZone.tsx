// components/DropZone.tsx
import React, { useState, useCallback } from 'react';
import { useDrop, useDrag } from 'react-dnd';

type ItemType = {
  id: string;
  name: string;
};

const DraggableDroppedItem: React.FC<{
  item: ItemType;
  index: number;
  moveItem: (from: number, to: number) => void;
  removeItem: (index: number) => void;
}> = ({ item, index, moveItem, removeItem }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'DROPPED',
    hover(draggedItem: { index: number }) {
      if (!ref.current || draggedItem.index === index) return;
      moveItem(draggedItem.index, index);
      draggedItem.index = index;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'DROPPED',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '0.5rem',
        margin: '0.25rem 0',
        background: '#e0f7ff',
        border: '1px solid #aaa',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'move',
      }}
    >
      <span>{item.name}</span>
      <button
        onClick={() => removeItem(index)}
        style={{ marginLeft: '0.5rem' }}
      >
        ✖
      </button>
    </div>
  );
};

const DropZone: React.FC = () => {
  const [droppedItems, setDroppedItems] = useState<ItemType[]>([]);

  const moveItem = useCallback((from: number, to: number) => {
    setDroppedItems((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(from, 1);
      updated.splice(to, 0, moved);
      return updated;
    });
  }, []);

  const removeItem = (index: number) => {
    setDroppedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const [, dropRef] = useDrop(() => ({
    accept: 'BOX',
    drop: (item: { name: string }) => {
      setDroppedItems((prev) => [
        ...prev,
        { id: crypto.randomUUID(), name: item.name },
      ]);
    },
  }));

  return (
    <div
      ref={dropRef}
      style={{
        minHeight: '200px',
        padding: '1rem',
        backgroundColor: '#f9f9f9',
        border: '2px dashed #ccc',
        width: '300px',
      }}
    >
      <strong>Drop zone (перетаскивай и удаляй):</strong>
      <div>
        {droppedItems.map((item, index) => (
          <DraggableDroppedItem
            key={item.id}
            item={item}
            index={index}
            moveItem={moveItem}
            removeItem={removeItem}
          />
        ))}
      </div>
    </div>
  );
};

export default DropZone;
