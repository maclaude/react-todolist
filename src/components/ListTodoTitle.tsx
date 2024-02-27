import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { useUpdateTodoTitleMutation } from '../api/mutations/todo';
import { useAuth } from '../context/authContext';
import useAutosizeTextArea from '../hooks/useAutosizeTextArea';

interface ListTitleProps {
  todoId: string;
  title: string;
  setTodoId?: (todoId: string) => void;
}

export const ListTodoTitle = ({ todoId, title, setTodoId }: ListTitleProps) => {
  const { token } = useAuth();
  const [titleValue, setTitleValue] = useState(title);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, titleValue);

  useEffect(() => {
    if (title) setTitleValue(title);
  }, [title]);

  const handleOnEnterBlur = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  const updateTodoTitleMutation = useUpdateTodoTitleMutation(useQueryClient());

  const handleClick = () => {
    if (setTodoId) setTodoId(todoId);
  };

  return (
    <textarea
      rows={1}
      ref={textAreaRef}
      className="todos_item__title"
      onChange={(e) => setTitleValue(e.currentTarget.value)}
      onKeyDown={(e) => handleOnEnterBlur(e)}
      onClick={handleClick}
      onBlur={() =>
        updateTodoTitleMutation.mutate({
          id: todoId,
          title: titleValue,
          token,
        })
      }
      value={titleValue}
    />
  );
};
