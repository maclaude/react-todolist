import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useState } from 'react';

import { PocDragAndDropElement } from '../components/PocDragAndDropElement';

import '../styles/PocDragAndDrop.scss';

export const PocDragAndDrop = () => {
  const [itemsOjects, setItemsObject] = useState([
    { id: '1', title: 'HTML' },
    { id: '2', title: 'Javascript' },
    { id: '3', title: 'Python' },
    { id: '4', title: 'SQL' },
    { id: '5', title: 'NodeJS' },
    { id: '6', title: 'PHP' },
    { id: '7', title: 'C++' },
    { id: '8', title: 'Ruby On Rails' },
    { id: '9', title: 'SCSS' },
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log('[handleDragEnd]', {
      id: '',
      todoId: '',
      activeId: active.id,
      overId: over?.id,
    });

    if (active.id !== over?.id) {
      setItemsObject((items) => {
        const overIndex = items.findIndex((item) => item.id === over?.id);
        const activeIndex = items.findIndex((item) => item.id === active.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="dnd_container">
        <h2 className="dnd_title">Drag & drop</h2>
        <SortableContext
          items={itemsOjects}
          strategy={verticalListSortingStrategy}
        >
          {itemsOjects.map((item) => (
            <PocDragAndDropElement
              key={item.id}
              id={item.id}
              title={item.title}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};
