import { useState } from "react";
import { GoChevronDown, GoChevronRight } from "react-icons/go";

import { ON_GOING } from "../data/constant";
import { Status, Todo } from "../types";

interface ListCompleteProps {
  listId: string;
  completeTodos: Todo[];
  onCheckboxClick: (listId: string, id: string, status: Status) => void;
}

export const ListComplete = ({
  listId,
  completeTodos,
  onCheckboxClick,
}: ListCompleteProps) => {
  const [isChevronToogle, setIsChevronToogle] = useState<boolean>(true);

  const handleChevronToogle = () => {
    setIsChevronToogle(!isChevronToogle);
  };

  return (
    <div className="list section-delete">
      <div className="list-title">
        <p>
          {`${completeTodos.length} ${
            completeTodos.length === 1 ? "terminé" : "terminés"
          }`}
        </p>
        {isChevronToogle ? (
          <GoChevronDown className="chevron" onClick={handleChevronToogle} />
        ) : (
          <GoChevronRight className="chevron" onClick={handleChevronToogle} />
        )}
      </div>
      {isChevronToogle && (
        <ul>
          {completeTodos.map(({ id, title }) => (
            <li key={id} className="list-item">
              <button
                className=" list-item-checkbox list-item-checkbox--checked"
                onClick={() => onCheckboxClick(listId, id, ON_GOING)}
              />
              <p>{title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
