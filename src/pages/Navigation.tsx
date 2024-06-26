import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';

import {
  useNewNoteMutation,
  useUpdateNoteStatusMutation,
} from '../api/mutations/note';
import { useNewTodolistMutation } from '../api/mutations/todolist';
import { useUpdateTodolistsOrderMutation } from '../api/mutations/user';
import {
  useFetchNotesQuery,
  useFetchTodolistsQuery,
} from '../api/queries/user';
import { NavigationItem } from '../components/NavigationItem';
import { ReactIcon } from '../components/ReactIcon';
import { useAuth } from '../context/authContext';
import { DELETE, ON_GOING } from '../data/constant';
import { Todolist } from '../types';
import { getOnGoingNotes, getOnGoingTodolists } from '../utils/helpers';

import '../styles/Buttons.scss';
import '../styles/Navigation.scss';

export const Navigation = () => {
  const navigate = useNavigate();
  const { id, token, authenticated } = useAuth();
  const [todolists, setTodolists] = useState<Todolist[]>([]);

  const { data: fetchedTodolists } = useFetchTodolistsQuery({
    authenticated,
    token,
  });

  const { data: fetchedNotes } = useFetchNotesQuery({
    authenticated,
    token,
  });

  const newTodolistMutation = useNewTodolistMutation(useQueryClient());
  const updateTodolistsOrderMutation = useUpdateTodolistsOrderMutation(
    useQueryClient(),
  );

  const newNoteMutation = useNewNoteMutation(useQueryClient());
  const updateNoteStatusMutation = useUpdateNoteStatusMutation(
    useQueryClient(),
  );

  useEffect(() => {
    if (fetchedTodolists) {
      setTodolists(fetchedTodolists);
    }
  }, [fetchedTodolists]);

  useEffect(() => {
    // updateTodolistsOrderMutation only with a minimum of 2 todos
    if (todolists.length > 1) {
      updateTodolistsOrderMutation.mutate({
        newItems: todolists.map((item) => item._id),
        token,
      });
    }
  }, [todolists]);

  useEffect(() => {
    if (newTodolistMutation.data) {
      navigate(`/todolist/${newTodolistMutation.data._id}`);
    }
  }, [newTodolistMutation.isSuccess]);

  useEffect(() => {
    if (newNoteMutation.data) {
      navigate(`/note/${newNoteMutation.data._id}`);
    }
  }, [newNoteMutation.isSuccess]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTodolists((items) => {
        const overIndex = items.findIndex((item) => item._id === over?.id);
        const activeIndex = items.findIndex((item) => item._id === active.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
  };

  // Sensors to enable click on dragable item
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  return (
    <nav className="navigation box--shadow">
      <section>
        <div className="navigation-title">
          <h3>Mes listes</h3>
          <ReactIcon
            icon={HiPlus}
            className="btn btn_icon navigation-icon"
            onClick={() =>
              newTodolistMutation.mutate({
                title: 'New todolist',
                status: ON_GOING,
                userId: id,
                token,
              })
            }
          />
        </div>

        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <ul>
            <SortableContext
              items={todolists.map((item) => item._id)}
              strategy={verticalListSortingStrategy}
            >
              {getOnGoingTodolists(todolists).map(
                ({ _id: todolistId, title }) => (
                  <NavigationItem
                    key={todolistId}
                    todolistId={todolistId}
                    title={title}
                  />
                ),
              )}
            </SortableContext>
          </ul>
        </DndContext>
      </section>

      <section>
        <div className="navigation-title">
          <h3>Mes notes</h3>
          <ReactIcon
            icon={HiPlus}
            className="btn btn_icon navigation-icon"
            onClick={() =>
              newNoteMutation.mutate({
                title: 'New note',
                status: 'ongoing',
                content: '[]',
                token,
              })
            }
          />
        </div>
        <ul>
          {fetchedNotes &&
            getOnGoingNotes(fetchedNotes).map(({ _id: noteId, title }) => (
              <li key={noteId} className="navigation-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'navigation-item-link navigation-item-link__active'
                      : 'navigation-item-link'
                  }
                  to={`note/${noteId}`}
                >
                  {title}
                </NavLink>
                <ReactIcon
                  icon={MdDelete}
                  className="icon navigation-item-delete-icon"
                  onClick={() => {
                    // Go back to previous history
                    navigate(-1);

                    return updateNoteStatusMutation.mutate({
                      id: noteId,
                      status: DELETE,
                      token,
                    });
                  }}
                />
              </li>
            ))}
        </ul>
      </section>

      <section>
        <div className="navigation-title">
          <h3>Dev</h3>
        </div>
        <ul>
          <li className="navigation-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'navigation-item-link navigation-item-link__active'
                  : 'navigation-item-link'
              }
              to={`components/buttons`}
            >
              Buttons
            </NavLink>
          </li>
          <li className="navigation-item">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? 'navigation-item-link navigation-item-link__active'
                  : 'navigation-item-link'
              }
              to={`components/poc`}
            >
              Poc
            </NavLink>
          </li>
        </ul>
      </section>

      <div className="navigation-user">
        <NavLink className="navigation-user" to={`/user`}>
          <FaSignInAlt />
          <span>{authenticated ? 'Mon compte' : 'Connexion'}</span>
        </NavLink>
      </div>
    </nav>
  );
};
