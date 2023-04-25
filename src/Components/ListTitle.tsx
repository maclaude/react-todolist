import { useState } from "react";
import { Todo } from "../types";

interface ListTitleProps {
  listId: string;
  title: string;
  onGoingTodos: Todo[];
  onSubmit: (listId: string, title: string) => void;
}

export const ListTitle = ({
  listId,
  title,
  onGoingTodos,
  onSubmit,
}: ListTitleProps) => {
  const [listTitle, setListTitle] = useState<string>(title);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setListTitle(event.currentTarget.value);
  };

  const handleOnEnterBlur = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.blur();
    }
  };

  const handleSubmit = () => {
    onSubmit(listId, listTitle);
  };

  return (
    <div className="title">
      <input
        className="title-input"
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleOnEnterBlur(e)}
        onBlur={handleSubmit}
        value={listTitle}
      />
      {onGoingTodos.length > 0 && (
        <p className="title-counter">{`${onGoingTodos.length} ${
          onGoingTodos.length === 1 ? "rappel" : "rappels"
        }`}</p>
      )}
    </div>
  );
};
