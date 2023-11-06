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
import { COMPLETE, NEW, ON_GOING } from '../data/constant';
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

  const { data: fetchedNewTodos } = usefetchTodolistTodosQuery(authContext, {
    id: todolistId,
    status: NEW,
  });

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

  const [newTodos, setNewTodos] = useState<Todo[]>(fetchedNewTodos || []);

  const [onGoingTodos, setOnGoingTodos] = useState<Todo[]>(
    fetchedOnGoingTodos || [],
  );

  useEffect(() => {
    if (fetchedNewTodos) {
      setNewTodos(fetchedNewTodos);
    }
  }, [fetchedNewTodos]);

  useEffect(() => {
    if (fetchedOnGoingTodos) {
      setOnGoingTodos(fetchedOnGoingTodos);
    }
  }, [fetchedOnGoingTodos]);

  useEffect(() => {
    if (newTodos.length > 1) {
      updateTodolistTodosOrderMutation.mutate({
        id: todolistId,
        newItems: newTodos.map((item) => item._id),
        section: NEW,
        token,
      });
    }
  }, [newTodos]);

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

  const handleNewTodosDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setNewTodos((items) => {
        const overIndex = items.findIndex((item) => item._id === over?.id);
        const activeIndex = items.findIndex((item) => item._id === active.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  const handleOnGoingTodosDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setOnGoingTodos((items) => {
        const overIndex = items.findIndex((item) => item._id === over?.id);
        const activeIndex = items.findIndex((item) => item._id === active.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  // Sensors to enable click on draggable item
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  return (
    <div id="todos-container">
      {fetchedNewTodos && fetchedNewTodos.length > 0 && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleNewTodosDragEnd}
          sensors={sensors}
        >
          <ul className="todos">
            <SortableContext
              items={newTodos.map((todo) => todo._id)}
              strategy={verticalListSortingStrategy}
            >
              {newTodos.map(({ _id: todoId, title }) => (
                <ListTodo
                  key={todoId}
                  todoId={todoId}
                  todolistId={todolistId}
                  title={title}
                  status={NEW}
                  setTodoId={setTodoId}
                />
              ))}
            </SortableContext>
          </ul>
        </DndContext>
      )}

      {fetchedOnGoingTodos && fetchedOnGoingTodos.length > 0 && (
        <>
          <div className="todos_title">
            {`${fetchedOnGoingTodos.length} en cours`}
            <GoChevronDown className="chevron" />
          </div>

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleOnGoingTodosDragEnd}
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
        </>
      )}

      {fetchedCompleteTodos && fetchedCompleteTodos.length > 0 && (
        <>
          <div className="todos_title">
            {`${fetchedCompleteTodos.length} ${
              fetchedCompleteTodos.length === 1 ? 'terminé' : 'terminés'
            }`}
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
