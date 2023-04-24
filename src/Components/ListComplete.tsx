import { useState } from "react";
import { GoChevronDown, GoChevronRight } from "react-icons/go";

import { ON_GOING } from "../constant";
import { Status, Todo } from "../types";

interface ListCompleteProps {
  completeTodos: Todo[];
  onCheckboxClick: (id: string, status: Status) => void;
}

export const ListComplete = ({
  completeTodos,
  onCheckboxClick,
}: ListCompleteProps) => {
  const [isChevronToogle, setIsChevronToogle] = useState<boolean>(false);

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
                onClick={() => onCheckboxClick(id, ON_GOING)}
              />
              <p>{title}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
