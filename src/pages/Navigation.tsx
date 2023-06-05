import { useQueryClient } from '@tanstack/react-query';
import { IconContext } from 'react-icons';
import { FaSignInAlt } from 'react-icons/fa';
import { MdAddCircle, MdDelete } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { DELETE, ON_GOING } from '../data/constant';
import {
  useNewTodolistMutation,
  useUpdateTodolistStatusMutation,
} from '../mutations/todolist';
import { Todolist } from '../types';

import '../styles/Navigation.scss';

interface NavigationProps {
  todolists: Todolist[];
}

export const Navigation = ({ todolists }: NavigationProps) => {
  const navigate = useNavigate();
  const { id, token, authenticated } = useAuth();

  const newTodolistMutation = useNewTodolistMutation();
  const updateTodolistStatusMutation = useUpdateTodolistStatusMutation();

  const queryClient = useQueryClient();

  useEffect(() => {
    const { isSuccess, data } = newTodolistMutation;

    if (isSuccess && data) {
      // @ts-ignore TODO: need to redefine previous todolist type
      queryClient.setQueryData(['todolists'], (previousTodolists) => [
        // @ts-ignore TODO: same
        ...previousTodolists,
        {
          _id: data.id,
          title: 'New Todo',
          status: ON_GOING,
          items: [],
        },
      ]);
      queryClient.invalidateQueries(['todolists']);

      navigate(`/todolist/${data.id}`);
    }
  }, [newTodolistMutation.isSuccess, newTodolistMutation.data]);

  useEffect(() => {
    const { isSuccess, data } = updateTodolistStatusMutation;

    if (isSuccess && data) {
      queryClient.invalidateQueries(['todolists']);
    }
  }, [
    updateTodolistStatusMutation.isSuccess,
    updateTodolistStatusMutation.data,
  ]);

  return (
    <nav className="navigation">
      <div className="navigation-title">
        <h3>Mes listes</h3>
        <IconContext.Provider value={{ className: 'icon' }}>
          <MdAddCircle
            onClick={() =>
              newTodolistMutation.mutate({
                title: 'New Todo',
                status: ON_GOING,
                userId: id,
                token,
              })
            }
          />
        </IconContext.Provider>
      </div>
      <div className="navigation-items">
        {todolists?.map(({ _id: todolistId, title }) => (
          <div key={todolistId} className="navigation-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'navigation-item-link navigation-item-link__active'
                  : 'navigation-item-link'
              }
              to={`todolist/${todolistId}`}
            >
              {title}
            </NavLink>
            <IconContext.Provider
              value={{ className: 'icon navigation-item-delete-icon' }}
            >
              <MdDelete
                onClick={() =>
                  updateTodolistStatusMutation.mutate({
                    id: todolistId,
                    status: DELETE,
                    token,
                  })
                }
              />
            </IconContext.Provider>
          </div>
        ))}
      </div>
      <div className="navigation-user">
        <NavLink className="navigation-user" to={`/user`}>
          <FaSignInAlt />
          <span>{authenticated ? 'Mon compte' : 'Connexion'}</span>
        </NavLink>
      </div>
    </nav>
  );
};
