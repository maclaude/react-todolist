import { IconContext } from "react-icons";
import { MdRemoveCircle } from "react-icons/md";
import { GoPencil } from "react-icons/go";

import { COMPLETE, DELETE } from "../constant";
import { Status, Todo } from "../types";
import { ListInput } from "./ListInput";

interface ListOnGoingProps {
  onGoingTodos: Todo[];
  onCheckboxClick: (id: string, status: Status) => void;
  onDeleteClick: (id: string, status: Status) => void;
  onTextChange: (id: string, title: string) => void;
}

export const ListOnGoing = ({
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
              onClick={() => onCheckboxClick(id, COMPLETE)}
              className="list-item-checkbox"
            />
            <ListInput onTextChange={onTextChange} id={id} title={title} />
            <div className="list-item-buttons">
              <IconContext.Provider value={{ className: "icon" }}>
                {/* TODO: Focus on ListInput onClick */}
                <GoPencil onClick={() => {}} />
                <MdRemoveCircle onClick={() => onDeleteClick(id, DELETE)} />
              </IconContext.Provider>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
