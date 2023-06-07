import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { IconContext } from 'react-icons';
import { TbArrowBigRightLineFilled } from 'react-icons/tb';

import { useAuth } from '../context/authContext';
import { ON_GOING } from '../data/constant';
import { useNewTodoMutation } from '../mutations/todo';

interface ListFormProps {
  todolistId: string;
}

export const ListNewTodo = ({ todolistId }: ListFormProps) => {
  const [newTodo, setNewTodo] = useState<string>('');

  const { token } = useAuth();
  const newTodoMutation = useNewTodoMutation(useQueryClient());

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newTodo.trim()) {
      newTodoMutation.mutate({
        title: newTodo.trim(),
        status: ON_GOING,
        todolistId,
        token,
      });
    }

    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className="new-todo">
      <input
        placeholder="Ajouter un rappel"
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <IconContext.Provider value={{ className: 'new-todo__button' }}>
        <TbArrowBigRightLineFilled />
      </IconContext.Provider>
    </form>
  );
};
