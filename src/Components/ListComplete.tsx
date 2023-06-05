import { useEffect, useState } from 'react';
import { GoChevronDown, GoChevronRight } from 'react-icons/go';

import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/authContext';
import { ON_GOING } from '../data/constant';
import { useUpdateTodoStatusMutation } from '../mutations/todo';
import { Todo } from '../types';

interface ListCompleteProps {
  completeTodos: Todo[];
}

export const ListComplete = ({ completeTodos }: ListCompleteProps) => {
  const [isChevronToogle, setIsChevronToogle] = useState<boolean>(true);

  const { token } = useAuth();
  const queryClient = useQueryClient();

  const updateTodoStatusMutation = useUpdateTodoStatusMutation();

  useEffect(() => {
    if (updateTodoStatusMutation.isSuccess) {
      queryClient.invalidateQueries(['todolists']);
    }
  }, [updateTodoStatusMutation.isSuccess]);

  const handleChevronToogle = () => {
    setIsChevronToogle(!isChevronToogle);
  };

  return (
    <div className="list section-delete">
      <div className="list-title">
        <p>
          {`${completeTodos.length} ${
            completeTodos.length === 1 ? 'terminé' : 'terminés'
          }`}
        </p>
        {isChevronToogle ? (
          <GoChevronDown className="chevron" onClick={handleChevronToogle} />
        ) : (
          <GoChevronRight className="chevron" onClick={handleChevronToogle} />
        )}
      </div>
      {isChevronToogle && (
        <ul>
          {completeTodos.map(({ _id, title }) => (
            <li key={_id} className="list-item">
              <button
                className=" list-item-checkbox list-item-checkbox--checked"
                onClick={() =>
                  updateTodoStatusMutation.mutate({
                    id: _id,
                    status: ON_GOING,
                    token,
                  })
                }
              />
              <p>{title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
