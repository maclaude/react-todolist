import { useState } from 'react';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';

import { COMPLETE, ON_GOING } from '../data/constant';
import { Todo } from '../types';
import { getCompleteTodos, getOnGoingTodos } from '../utils/helpers';
import { ListTodo } from './ListTodo';

interface ListOnGoingProps {
  todos: Todo[];
}

export const ListTodos = ({ todos }: ListOnGoingProps) => {
  const [isChevronToogle, setIsChevronToogle] = useState<boolean>(true);

  const handleChevronToogle = () => {
    setIsChevronToogle(!isChevronToogle);
  };

  return (
    <>
      {/* section todos on going */}
      <ul className="todos">
        {getOnGoingTodos(todos).map(({ _id, title }) => (
          <ListTodo key={_id} id={_id} title={title} status={ON_GOING} />
        ))}
      </ul>
      {/* chevron */}
      {getCompleteTodos(todos).length > 0 && (
        <>
          <div className="todos_title">
            <p>
              {`${getCompleteTodos(todos).length} ${
                getCompleteTodos(todos).length === 1 ? 'terminé' : 'terminés'
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
              {getCompleteTodos(todos).map(({ _id, title }) => (
                <ListTodo key={_id} id={_id} title={title} status={COMPLETE} />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  );
};
