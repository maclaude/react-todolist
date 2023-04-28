import { IconContext } from "react-icons";
import { MdAddCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { TodoList } from "../types";

interface NavigationProps {
  todoLists: TodoList[];
  addTodoList: () => void;
}

export const Navigation = ({ todoLists, addTodoList }: NavigationProps) => {
  return (
    <nav className="navigation">
      <div className="navigation-title">
        <h3>Mes listes</h3>
        <IconContext.Provider value={{ className: "icon" }}>
          <MdAddCircle onClick={addTodoList} />
        </IconContext.Provider>
      </div>
      {todoLists.map(({ id, title }) => (
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "navigation-link navigation-link__active"
              : "navigation-link"
          }
          key={id}
          to={`lists/${id}`}
        >
          {title}
        </NavLink>
      ))}
    </nav>
  );
};
