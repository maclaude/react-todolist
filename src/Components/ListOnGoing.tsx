import { IconContext } from "react-icons";
import { MdRemoveCircle } from "react-icons/md";

import { COMPLETE, DELETE } from "../data/constant";
import { Status, Todo } from "../types";
import { ListInput } from "./ListInput";

interface ListOnGoingProps {
  listId: string;
  onGoingTodos: Todo[];
  onCheckboxClick: (listId: string, itemId: string, status: Status) => void;
  onDeleteClick: (listId: string, itemId: string, status: Status) => void;
  onTextChange: (listId: string, itemId: string, title: string) => void;
}

export const ListOnGoing = ({
  listId,
  onGoingTodos,
  onCheckboxClick,
  onDeleteClick,
  onTextChange,
}: ListOnGoingProps) => {
  return (
    <>
      <ul className="list">
        {onGoingTodos.map(({ id, title }) => (
          <li key={id} className="list-item">
            <button
              onClick={() => onCheckboxClick(listId, id, COMPLETE)}
              className="list-item-checkbox"
            />
            <ListInput
              listId={listId}
              onTextChange={onTextChange}
              id={id}
              title={title}
            />
            <div className="list-item-buttons">
              <IconContext.Provider value={{ className: "icon" }}>
                <MdRemoveCircle
                  onClick={() => onDeleteClick(listId, id, DELETE)}
                />
              </IconContext.Provider>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};