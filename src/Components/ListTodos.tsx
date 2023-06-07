import { useState } from 'react';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';

import { useAuth } from '../context/authContext';
import { COMPLETE, ON_GOING } from '../data/constant';
import { usefetchTodolistTodosQuery } from '../queries/todolist';
import { ListTodo } from './ListTodo';

interface ListOnGoingProps {
  todolistId: string;
}

export const ListTodos = ({ todolistId }: ListOnGoingProps) => {
  const { authenticated, token } = useAuth();
  const [isChevronToogle, setIsChevronToogle] = useState<boolean>(true);

  const handleChevronToogle = () => {
    setIsChevronToogle(!isChevronToogle);
  };

  const authContext = { authenticated, token };

  const { data: onGoingTodos } = usefetchTodolistTodosQuery(authContext, {
    id: todolistId,
    status: ON_GOING,
  });

  const { data: completeTodos } = usefetchTodolistTodosQuery(authContext, {
    id: todolistId,
    status: COMPLETE,
  });

  return (
    <>
      {/* section todos on going */}
      <ul className="todos">
        {onGoingTodos?.map(({ _id: todoId, title }) => (
          <ListTodo
            key={todoId}
            todoId={todoId}
            todolistId={todolistId}
            title={title}
            status={ON_GOING}
          />
        ))}
      </ul>
      {/* chevron */}
      {completeTodos && completeTodos.length > 0 && (
        <>
          <div className="todos_title">
            <p>
              {`${completeTodos.length} ${
                completeTodos.length === 1 ? 'terminé' : 'terminés'
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
          {/* section todos completed */}
          {isChevronToogle && (
            <ul className="todos">
              {completeTodos.map(({ _id: todoId, title }) => (
                <ListTodo
                  key={todoId}
                  todoId={todoId}
                  todolistId={todolistId}
                  title={title}
                  status={COMPLETE}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};
