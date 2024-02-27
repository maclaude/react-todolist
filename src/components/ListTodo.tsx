import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useQueryClient } from '@tanstack/react-query';
import { CgUndo } from 'react-icons/cg';

import { useUpdateTodoStatusMutation } from '../api/mutations/todo';
import { useAuth } from '../context/authContext';
import { COMPLETE, DELETE, NEW, ON_GOING } from '../data/constant';
import { Status } from '../types';
import { ListTodoTitle } from './ListTodoTitle';
import { ReactIcon } from './ReactIcon';

import '../styles/Buttons.scss';

type ListTodoProps = {
  todoId: string;
  todolistId: string;
  title: string;
  status: Status;
  setTodoId: (todoId: string) => void;
};

const getTodoNewStatusOnCheckoxClick = (status: Status) => {
  switch (status) {
    case NEW:
      return ON_GOING;
    case ON_GOING:
      return COMPLETE;
    case COMPLETE:
      return ON_GOING;
    default:
      throw new Error(`invalid todo status ${status}`);
  }
};

const getTodoNewStatusOnIconClick = (status: Status) => {
  switch (status) {
    case NEW:
      return DELETE;
    case ON_GOING:
      return NEW;
    case COMPLETE:
      return DELETE;
    default:
      throw new Error(`invalid todo status ${status}`);
  }
};

const getCheckboxClassName = (status: Status) => {
  switch (status) {
    case NEW:
      return 'todos_item__checkbox';
    case ON_GOING:
      return 'todos_item__checkbox todos_item__checkbox--ongoing';
    case COMPLETE:
      return 'todos_item__checkbox todos_item__checkbox--complete';
    default:
      throw new Error(`invalid todo status ${status}`);
  }
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
            newStatus: getTodoNewStatusOnCheckoxClick(status),
            token,
          })
        }
        className={getCheckboxClassName(status)}
      />
      <ListTodoTitle todoId={todoId} title={title} setTodoId={setTodoId} />
      {status === ON_GOING && (
        <ReactIcon
          className="btn btn_icon todos_item__undo-icon"
          icon={CgUndo}
          onClick={() =>
            updateTodoStatusMutation.mutate({
              id: todoId,
              todolistId,
              currentStatus: status,
              newStatus: getTodoNewStatusOnIconClick(status),
              token,
            })
          }
        />
      )}
    </li>
  );
};
