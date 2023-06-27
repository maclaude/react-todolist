import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useQueryClient } from '@tanstack/react-query';
import { MdRemoveCircle } from 'react-icons/md';

import { useUpdateTodoStatusMutation } from '../api/mutations/todo';
import { useAuth } from '../context/authContext';
import { COMPLETE, DELETE, ON_GOING } from '../data/constant';
import { Status } from '../types';
import { ListTodoInput } from './ListTodoInput';
import { ReactIcon } from './ReactIcon';

type ListTodoProps = {
  todoId: string;
  todolistId: string;
  title: string;
  status: Status;
  setTodoId: (todoId: string) => void;
};

export const ListTodo = ({
  todoId,
  todolistId,
  title,
  status,
  setTodoId,
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
      <ListTodoInput todoId={todoId} title={title} setTodoId={setTodoId} />
      <ReactIcon
        className="icon"
        icon={MdRemoveCircle}
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
    </li>
  );
};
