/* eslint-disable no-underscore-dangle */
import { useParams } from 'react-router-dom';

import { ListNewTodo } from '../components/ListNewTodo';
import { ListTitle } from '../components/ListTitle';
import { ListTodos } from '../components/ListTodos';
import { Todolist } from '../types';

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
    <div id="todolist_container">
      <ListTitle
        listId={id}
        title={currentTodoList.title}
        onGoingTodos={currentTodoList.items.ongoing}
      />
      <ListNewTodo listId={id} />
      <ListTodos
        listId={id}
        onGoingTodos={currentTodoList.items.ongoing}
        completeTodos={currentTodoList.items.complete}
      />
    </div>
  ) : (
    <>
      <span>Sorry your todo is not Found 🫠</span>
    </>
  );
};
