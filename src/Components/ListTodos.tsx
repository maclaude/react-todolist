import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';

import { useUpdateTodolistTodosOrder } from '../api/mutations/todolist';
import { usefetchTodolistTodosQuery } from '../api/queries/todolist';
import { useAuth } from '../context/authContext';
import { COMPLETE, ON_GOING } from '../data/constant';
import { Todo } from '../types';
import { ListTodo } from './ListTodo';

interface ListOnGoingProps {
  todolistId: string;
  setTodoId: (todoId: string) => void;
}

export const ListTodos = ({ todolistId, setTodoId }: ListOnGoingProps) => {
  const { authenticated, token } = useAuth();
  const [isChevronToogle, setIsChevronToogle] = useState<boolean>(true);

  const authContext = { authenticated, token };

  const { data: fetchedOnGoingTodos } = usefetchTodolistTodosQuery(
    authContext,
    {
      id: todolistId,
      status: ON_GOING,
    },
  );

  const { data: fetchedCompleteTodos } = usefetchTodolistTodosQuery(
    authContext,
    {
      id: todolistId,
      status: COMPLETE,
    },
  );

  const updateTodolistTodosOrderMutation = useUpdateTodolistTodosOrder(
    useQueryClient(),
  );

  const [onGoingTodos, setOnGoingTodos] = useState<Todo[]>(
    fetchedOnGoingTodos || [],
  );

  useEffect(() => {
    if (fetchedOnGoingTodos) {
      setOnGoingTodos(fetchedOnGoingTodos);
    }
  }, [fetchedOnGoingTodos]);

  useEffect(() => {
    if (onGoingTodos.length > 1) {
      updateTodolistTodosOrderMutation.mutate({
        id: todolistId,
        newItems: onGoingTodos.map((item) => item._id),
        section: ON_GOING,
        token,
      });
    }
  }, [onGoingTodos]);

  const handleChevronToogle = () => {
    setIsChevronToogle(!isChevronToogle);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setOnGoingTodos((items) => {
        const overIndex = items.findIndex((item) => item._id === over?.id);
        const activeIndex = items.findIndex((item) => item._id === active.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  // Sensors to enable click on dragable item
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  return (
    <div id="todos-container">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <ul className="todos">
          <SortableContext
            items={onGoingTodos.map((todo) => todo._id)}
            strategy={verticalListSortingStrategy}
          >
            {onGoingTodos &&
              onGoingTodos.map(({ _id: todoId, title }) => (
                <ListTodo
                  key={todoId}
                  todoId={todoId}
                  todolistId={todolistId}
                  title={title}
                  status={ON_GOING}
                  setTodoId={setTodoId}
                />
              ))}
          </SortableContext>
        </ul>
      </DndContext>

      {fetchedCompleteTodos && fetchedCompleteTodos.length > 0 && (
        <>
          <div className="todos_title">
            <p>
              {`${fetchedCompleteTodos.length} ${
                fetchedCompleteTodos.length === 1 ? 'terminé' : 'terminés'
              }`}
            </p>
            {isChevronToogle ? (
              <GoChevronDown
                className="chevron"
                onClick={handleChevronToogle}
              />
            ) : (
              <GoChevronRight
                className="chevron"
                onClick={handleChevronToogle}
              />
            )}
          </div>

          {isChevronToogle && (
            <ul className="todos">
              {fetchedCompleteTodos.map(({ _id: todoId, title }) => (
                <ListTodo
                  key={todoId}
                  todoId={todoId}
                  todolistId={todolistId}
                  title={title}
                  status={COMPLETE}
                  setTodoId={setTodoId}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};
