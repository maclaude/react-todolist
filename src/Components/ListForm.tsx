import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { TbArrowBigRightLineFilled } from 'react-icons/tb';

import { useAuth } from '../context/authContext';
import { ON_GOING } from '../data/constant';
import { useNewTodoMutation } from '../mutations/todo';

interface ListFormProps {
  listId: string;
}

export const ListForm = ({ listId }: ListFormProps) => {
  const [newTodo, setNewTodo] = useState<string>('');

  const { token } = useAuth();
  const { mutate, isSuccess, data } = useNewTodoMutation();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (isSuccess && data) {
      // TODO: setQueryData
      queryClient.invalidateQueries(['todolists']);
    }
  }, [isSuccess, data]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.trim()) {
      mutate({
        title: newTodo.trim(),
        status: ON_GOING,
        todolistId: listId,
        token,
      });
    }

    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className="input">
      <input
        className="input-field"
        placeholder="Ajouter un rappel"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <IconContext.Provider value={{ className: 'input-button' }}>
        <TbArrowBigRightLineFilled />
      </IconContext.Provider>
    </form>
  );
};
