import { IconContext } from 'react-icons';
import { FaSignInAlt } from 'react-icons/fa';
import { MdAddCircle, MdDelete } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import { DELETE } from '../data/constant';
import { Status, TodoList } from '../types';
import '../styles/Navigation.scss';

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
      <div className="navigation-items">
        {todoLists?.map(({ id, title }) => (
          <div key={id} className="navigation-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'navigation-item-link navigation-item-link__active'
                  : 'navigation-item-link'
              }
              to={`lists/${id}`}
            >
              {title}
            </NavLink>
            <IconContext.Provider
              value={{ className: 'icon navigation-item-delete-icon' }}
            >
              <MdDelete onClick={() => updateTodoListStatus(id, DELETE)} />
            </IconContext.Provider>
          </div>
        ))}
      </div>
      <div className="navigation-user">
        <NavLink to={`/user`}>
          <FaSignInAlt />
        </NavLink>
      </div>
    </nav>
  );
};
