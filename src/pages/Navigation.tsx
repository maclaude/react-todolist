import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { IconContext } from 'react-icons';
import { FaSignInAlt } from 'react-icons/fa';
import { MdAddCircle, MdDelete } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/authContext';
import { DELETE, ON_GOING } from '../data/constant';
import {
  useNewTodolistMutation,
  useUpdateTodolistStatusMutation,
} from '../mutations/todolist';
import { useFetchTodolistsQuery } from '../queries/user';
import { getOnGoingTodolists } from '../utils/helpers';

import '../styles/Navigation.scss';

export const Navigation = () => {
  const navigate = useNavigate();
  const { id, token, authenticated } = useAuth();

  const fetchTodolistsQuery = useFetchTodolistsQuery({
    authenticated,
    token,
  });

  const newTodolistMutation = useNewTodolistMutation();
  const updateTodolistStatusMutation = useUpdateTodolistStatusMutation(
    useQueryClient(),
  );

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
          items: {
            ongoing: [],
            complete: [],
            delete: [],
          },
        },
      ]);
      queryClient.invalidateQueries(['todolists']);

      navigate(`/todolist/${data.id}`);
    }
  }, [newTodolistMutation.isSuccess, newTodolistMutation.data]);

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

      {fetchTodolistsQuery.data &&
        getOnGoingTodolists(fetchTodolistsQuery.data).map(
          ({ _id: todolistId, title }) => (
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
          ),
        )}

      <div className="navigation-title">
        <h3>Dev</h3>
      </div>

      <div className="navigation-item">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? 'navigation-item-link navigation-item-link__active'
              : 'navigation-item-link'
          }
          to={`poc/dnd`}
        >
          Drag & drop
        </NavLink>
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
