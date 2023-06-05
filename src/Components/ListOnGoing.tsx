import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { MdRemoveCircle } from 'react-icons/md';

import { useAuth } from '../context/authContext';
import { COMPLETE, DELETE } from '../data/constant';
import { useUpdateTodoStatusMutation } from '../mutations/todo';
import { Todo } from '../types';
import { ListInput } from './ListInput';

interface ListOnGoingProps {
  onGoingTodos: Todo[];
}

export const ListOnGoing = ({ onGoingTodos }: ListOnGoingProps) => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const updateTodoStatusMutation = useUpdateTodoStatusMutation();

  useEffect(() => {
    if (updateTodoStatusMutation.isSuccess) {
      queryClient.invalidateQueries(['todolists']);
    }
  }, [updateTodoStatusMutation.isSuccess]);

  return (
    <>
      <ul className="list">
        {onGoingTodos.map(({ _id, title }) => (
          <li key={_id} className="list-item">
            <button
              onClick={() =>
                updateTodoStatusMutation.mutate({
                  id: _id,
                  status: COMPLETE,
                  token,
                })
              }
              className="list-item-checkbox"
            />
            <ListInput id={_id} title={title} />
            <div className="list-item-buttons">
              <IconContext.Provider value={{ className: 'icon' }}>
                <MdRemoveCircle
                  onClick={() =>
                    updateTodoStatusMutation.mutate({
                      id: _id,
                      status: DELETE,
                      token,
                    })
                  }
                />
              </IconContext.Provider>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
