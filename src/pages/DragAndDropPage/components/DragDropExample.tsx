// DragDropExample.tsx
import React from 'react';
import DraggableItem from './DraggableItem';
import DropZone from './DropZone';

const DragDropExample = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h3>Перетащи элемент в зону</h3>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div>
          <h4>Элементы для перетаскивания:</h4>
          <DraggableItem name="Элемент 1" />
          <DraggableItem name="Элемент 2" />
          <DraggableItem name="Элемент 3" />
        </div>

        <DropZone />
      </div>
    </div>
  );
};

export default DragDropExample;
