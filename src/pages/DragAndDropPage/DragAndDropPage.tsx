import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import DragDropExample from './components/DragDropExample';

const DragAndDropPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <DragDropExample />
    </DndProvider>
  );
};

export default DragAndDropPage;
