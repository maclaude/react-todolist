import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { TbArrowBigRightLineFilled } from 'react-icons/tb';

import { useNewTodoMutation } from '../api/mutations/todo';
import { useAuth } from '../context/authContext';
import { ON_GOING } from '../data/constant';
import { ReactIcon } from './ReactIcon';

interface ListFormProps {
  todolistId: string;
}

export const ListNewTodo = ({ todolistId }: ListFormProps) => {
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    setNewTodo('');
  }, [todolistId]);

  const { token } = useAuth();
  const newTodoMutation = useNewTodoMutation(useQueryClient());

  const handleSubmit = (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<Element, MouseEvent>,
  ) => {
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
      <ReactIcon
        className="new-todo__button"
        icon={TbArrowBigRightLineFilled}
        onClick={(e) => handleSubmit(e)}
      />
    </form>
  );
};
