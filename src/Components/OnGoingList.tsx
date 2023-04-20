import { COMPLETE } from "../constant";
import { Status, Todo } from "../types";

interface OnGoingListProps {
  onGoingTodos: Todo[];
  onCheckboxClick: (id: string, status: Status) => void;
}

export const OnGoingList = ({
  onGoingTodos,
  onCheckboxClick,
}: OnGoingListProps) => {
  return (
    <div className="list">
      <ul>
        {onGoingTodos.map((todo) => (
          <li key={todo.id} className="list-item">
            <button
              onClick={() => onCheckboxClick(todo.id, COMPLETE)}
              className="list-item-checkbox"
            />
            <p>{todo.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
