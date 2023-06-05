/* eslint-disable no-underscore-dangle */
import { useParams } from 'react-router-dom';

import { ListComplete } from '../components/ListComplete';
import { ListForm } from '../components/ListForm';
import { ListOnGoing } from '../components/ListOnGoing';
import { ListTitle } from '../components/ListTitle';
import { Todolist } from '../types';
import { getCompleteTodos, getOnGoingTodos } from '../utils/helpers';

import '../styles/List.scss';

interface TodoListProps {
  todolists: Todolist[];
}

// TODO: - Query GET todolist/todos to hydrate component
//       - Redefine page components

export const List = ({ todolists }: TodoListProps) => {
  const { id } = useParams();
  const currentTodoList = todolists.find((todolist) => todolist._id === id);

  return id && currentTodoList ? (
    <div className="list-container">
      <ListTitle
        listId={id}
        title={currentTodoList.title}
        onGoingTodos={getOnGoingTodos(currentTodoList.items)}
      />
      <ListForm listId={id} />
      <ListOnGoing onGoingTodos={getOnGoingTodos(currentTodoList.items)} />
      {getCompleteTodos(currentTodoList.items).length > 0 && (
        <ListComplete completeTodos={getCompleteTodos(currentTodoList.items)} />
      )}
    </div>
  ) : (
    <>
      <span>Sorry your todo is not Found 🫠</span>
    </>
  );
};
