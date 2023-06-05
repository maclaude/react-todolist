import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useUpdateTodolistTitleMutation } from '../mutations/todolist';
import { Todo } from '../types';

interface ListTitleProps {
  listId: string;
  title: string;
  onGoingTodos: Todo[];
}

export const ListTitle = ({ listId, title, onGoingTodos }: ListTitleProps) => {
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

  const updateTodoListTitleMutation = useUpdateTodolistTitleMutation();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (updateTodoListTitleMutation.isSuccess) {
      queryClient.invalidateQueries(['todolists']);
    }
  }, [updateTodoListTitleMutation.isSuccess]);

  return (
    <div className="title">
      <input
        className="title-input"
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleOnEnterBlur(e)}
        onBlur={() =>
          updateTodoListTitleMutation.mutate({
            id: listId,
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
