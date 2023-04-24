import { Todo } from "../types";

interface ListTitleProps {
  onGoingTodo: Todo[];
}

export const ListTitle = ({ onGoingTodo }: ListTitleProps) => {
  return (
    <div className="title">
      <h1>Todo list</h1>
      <p>{`${onGoingTodo.length} ${
        onGoingTodo.length === 1 ? "rappel" : "rappels"
      }`}</p>
    </div>
  );
};
