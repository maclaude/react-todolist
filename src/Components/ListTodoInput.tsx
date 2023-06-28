import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useUpdateTodoTitleMutation } from '../api/mutations/todo';
import { useAuth } from '../context/authContext';

interface ListInputProps {
  todoId: string;
  title: string;
  setTodoId: (todoId: string) => void;
}

export const ListTodoInput = ({ todoId, title, setTodoId }: ListInputProps) => {
  const { token } = useAuth();
  const [inputValue, setInputValue] = useState(title);

  useEffect(() => {
    if (title) setInputValue(title);
  }, [title]);

  const handleOnEnterBlur = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  const updateTodoTitleMutation = useUpdateTodoTitleMutation(useQueryClient());

  const handleClick = () => {
    setTodoId(todoId);
  };

  return (
    <input
      className="todos_item__input"
      onChange={(e) => setInputValue(e.currentTarget.value)}
      onKeyDown={(e) => handleOnEnterBlur(e)}
      onClick={handleClick}
      onBlur={() =>
        updateTodoTitleMutation.mutate({
          id: todoId,
          title: inputValue,
          token,
        })
      }
      value={inputValue}
    />
  );
};
