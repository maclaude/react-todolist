import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useAuth } from '../context/authContext';
import { useUpdateTodolistTitleMutation } from '../mutations/todolist';
import { Todo } from '../types';

interface ListTitleProps {
  todolistId: string;
  title: string;
  onGoingTodos: Todo[];
}

export const ListTitle = ({
  todolistId,
  title,
  onGoingTodos,
}: ListTitleProps) => {
  const { token } = useAuth();
  const [listTitle, setListTitle] = useState<string>(title);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setListTitle(event.currentTarget.value);
  };

  useEffect(() => {
    setListTitle(title);
  }, [title]);

  const handleOnEnterBlur = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  const updateTodoListTitleMutation = useUpdateTodolistTitleMutation(
    useQueryClient(),
  );

  return (
    <div id="todolist_title">
      <input
        id="todolist_title__input"
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleOnEnterBlur(e)}
        onBlur={() =>
          updateTodoListTitleMutation.mutate({
            id: todolistId,
            title: listTitle,
            token,
          })
        }
        value={listTitle}
      />
      {onGoingTodos.length > 0 && (
        <p className="title-counter">{`${onGoingTodos.length} ${
          onGoingTodos.length === 1 ? 'rappel' : 'rappels'
        }`}</p>
      )}
    </div>
  );
};
