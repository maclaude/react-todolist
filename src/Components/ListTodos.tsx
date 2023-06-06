import { useState } from 'react';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';

import { COMPLETE, ON_GOING } from '../data/constant';
import { Todo } from '../types';
import { ListTodo } from './ListTodo';

interface ListOnGoingProps {
  listId: string;
  onGoingTodos: Todo[];
  completeTodos: Todo[];
}

export const ListTodos = ({
  listId,
  onGoingTodos,
  completeTodos,
}: ListOnGoingProps) => {
  const [isChevronToogle, setIsChevronToogle] = useState<boolean>(true);

  const handleChevronToogle = () => {
    setIsChevronToogle(!isChevronToogle);
  };

  return (
    <>
      {/* section todos on going */}
      <ul className="todos">
        {onGoingTodos.map(({ _id, title }) => (
          <ListTodo
            key={_id}
            id={_id}
            listId={listId}
            title={title}
            status={ON_GOING}
          />
        ))}
      </ul>
      {/* chevron */}
      {completeTodos.length > 0 && (
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
              {completeTodos.map(({ _id, title }) => (
                <ListTodo
                  key={_id}
                  id={_id}
                  listId={listId}
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
