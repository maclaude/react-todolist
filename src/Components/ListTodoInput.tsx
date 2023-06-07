import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useAuth } from '../context/authContext';
import { useUpdateTodoTitleMutation } from '../mutations/todo';

interface ListInputProps {
  todoId: string;
  title: string;
}

export const ListTodoInput = ({ todoId, title }: ListInputProps) => {
  const { token } = useAuth();
  const [inputValue, setInputValue] = useState(title);

  const handleOnEnterBlur = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  const updateTodoTitleMutation = useUpdateTodoTitleMutation(useQueryClient());

  return (
    <input
      className="todos_item__input"
      onChange={(e) => setInputValue(e.currentTarget.value)}
      onKeyDown={(e) => handleOnEnterBlur(e)}
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
