import { useQueryClient } from '@tanstack/react-query';
import { CgUndo } from 'react-icons/cg';

import { useUpdateTodoStatusMutation } from '../api/mutations/todo';
import { useAuth } from '../context/authContext';
import { COMPLETE, DELETE, NEW, ON_GOING } from '../data/constant';
import { Status } from '../types';
import { ListTodoInput } from './ListTodoInput';
import { ReactIcon } from './ReactIcon';

import '../styles/Buttons.scss';

type ListTodoProps = {
  todoId: string;
  todolistId: string;
  title: string;
  status: Status;
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

export const ListTodoUndraggable = ({
  todoId,
  todolistId,
  title,
  status,
}: ListTodoProps) => {
  const { token } = useAuth();

  const updateTodoStatusMutation = useUpdateTodoStatusMutation(
    useQueryClient(),
  );

  return (
    <li className="todos_item">
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
      <ListTodoInput todoId={todoId} title={title} />
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
