import { IconContext } from "react-icons";
import { MdRemoveCircle } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { COMPLETE, DELETE } from "../constant";
import { Status, Todo } from "../types";
import { ListInput } from "./ListInput";

interface OnGoingListProps {
  onGoingTodos: Todo[];
  onCheckboxClick: (id: string, status: Status) => void;
  onDeleteClick: (id: string, status: Status) => void;
  onTextChange: (id: string, title: string) => void;
}

export const OnGoingList = ({
  onGoingTodos,
  onCheckboxClick,
  onDeleteClick,
  onTextChange,
}: OnGoingListProps) => {
  return (
    <>
      <ul className="list">
        {onGoingTodos.map((todo) => (
          <li key={todo.id} className="list-item">
            <button
              onClick={() => onCheckboxClick(todo.id, COMPLETE)}
              className="list-item-checkbox"
            />
            <ListInput
              onTextChange={onTextChange}
              id={todo.id}
              title={todo.title}
            />
            <div className="list-item-buttons">
              <IconContext.Provider value={{ className: "icon" }}>
                <GoPencil onClick={() => {}} />
                <MdRemoveCircle
                  onClick={() => onDeleteClick(todo.id, DELETE)}
                />
              </IconContext.Provider>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
