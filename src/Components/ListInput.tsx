import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useAuth } from '../context/authContext';
import { useUpdateTodoTitleMutation } from '../mutations/todo';

interface ListInputProps {
  id: string;
  title: string;
}

export const ListInput = ({ id, title }: ListInputProps) => {
  const [inputValue, setInputValue] = useState(title);

  const handleOnEnterBlur = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  const { token } = useAuth();
  const queryClient = useQueryClient();
  const updateTodoTitleMutation = useUpdateTodoTitleMutation();

  useEffect(() => {
    if (updateTodoTitleMutation.isSuccess) {
      queryClient.invalidateQueries(['todolists']);
    }
  }, [updateTodoTitleMutation.isSuccess]);

  return (
    <input
      className="list-item-input"
      onChange={(e) => setInputValue(e.currentTarget.value)}
      onKeyDown={(e) => handleOnEnterBlur(e)}
      onBlur={() =>
        updateTodoTitleMutation.mutate({
          id,
          title: inputValue,
          token,
        })
      }
      value={inputValue}
    />
  );
};
