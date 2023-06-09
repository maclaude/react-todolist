import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useQueryClient } from '@tanstack/react-query';
import { MdDelete } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';

import { useUpdateTodolistStatusMutation } from '../api/mutations/todolist';
import { useAuth } from '../context/authContext';
import { DELETE } from '../data/constant';
import { ReactIcon } from './ReactIcon';

type NavigationItemProps = {
  todolistId: string;
  title: string;
};

export const NavigationItem = ({ todolistId, title }: NavigationItemProps) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const updateTodolistStatusMutation = useUpdateTodolistStatusMutation(
    useQueryClient(),
  );

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todolistId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      className="navigation-item"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {!isDragging ? (
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
      ) : (
        title
      )}
      <ReactIcon
        icon={MdDelete}
        className="icon navigation-item-delete-icon"
        onClick={() => {
          // Go back to previous history
          navigate(-1);

          return updateTodolistStatusMutation.mutate({
            id: todolistId,
            status: DELETE,
            token,
          });
        }}
      />
    </li>
  );
};
