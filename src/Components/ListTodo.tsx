import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useQueryClient } from '@tanstack/react-query';
import { IconContext } from 'react-icons';
import { MdRemoveCircle } from 'react-icons/md';

import { useAuth } from '../context/authContext';
import { COMPLETE, DELETE, ON_GOING } from '../data/constant';
import { useUpdateTodoStatusMutation } from '../mutations/todo';
import { Status } from '../types';
import { ListTodoInput } from './ListTodoInput';

type ListTodoProps = {
  todoId: string;
  todolistId: string;
  title: string;
  status: Status;
};

export const ListTodo = ({
  todoId,
  todolistId,
  title,
  status,
}: ListTodoProps) => {
  const { token } = useAuth();

  const updateTodoStatusMutation = useUpdateTodoStatusMutation(
    useQueryClient(),
  );

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todoId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      className="todos_item"
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <button
        onClick={() =>
          updateTodoStatusMutation.mutate({
            id: todoId,
            todolistId,
            currentStatus: status,
            newStatus: status === ON_GOING ? COMPLETE : ON_GOING,
            token,
          })
        }
        className={
          status === COMPLETE
            ? 'todos_item__checkbox todos_item__checkbox--checked'
            : 'todos_item__checkbox'
        }
      />
      <ListTodoInput todoId={todoId} title={title} />
      <IconContext.Provider value={{ className: 'icon' }}>
        <MdRemoveCircle
          onClick={() =>
            updateTodoStatusMutation.mutate({
              id: todoId,
              todolistId,
              currentStatus: status,
              newStatus: DELETE,
              token,
            })
          }
        />
      </IconContext.Provider>
    </li>
  );
};
