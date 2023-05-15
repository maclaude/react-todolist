import { IconContext } from 'react-icons';
import { MdAddCircle, MdDelete } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { DELETE } from '../data/constant';
import { Status, TodoList } from '../types';

interface NavigationProps {
  todoLists: TodoList[];
  addTodoList: () => void;
  updateTodoListStatus: (listId: string, status: Status) => void;
}

export const Navigation = ({
  todoLists,
  addTodoList,
  updateTodoListStatus,
}: NavigationProps) => {
  return (
    <nav className="navigation">
      <div className="navigation-title">
        <h3>Mes listes</h3>
        <IconContext.Provider value={{ className: 'icon' }}>
          <MdAddCircle onClick={addTodoList} />
        </IconContext.Provider>
      </div>

      {todoLists?.map(({ id, title }) => (
        <div key={id} className="navigation-container">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'navigation-link navigation-link__active'
                : 'navigation-link'
            }
            to={`lists/${id}`}
          >
            {title}
          </NavLink>
          <IconContext.Provider
            value={{ className: 'icon navigation-delete-icon' }}
          >
            <MdDelete onClick={() => updateTodoListStatus(id, DELETE)} />
          </IconContext.Provider>
        </div>
      ))}
    </nav>
  );
};
