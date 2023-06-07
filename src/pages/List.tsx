import { useParams } from 'react-router-dom';

import { ListNewTodo } from '../components/ListNewTodo';
import { ListTitle } from '../components/ListTitle';
import { ListTodos } from '../components/ListTodos';
import { useAuth } from '../context/authContext';
import { useFetchTodolistQuery } from '../queries/todolist';

import '../styles/List.scss';

export const List = () => {
  const { authenticated, token } = useAuth();
  const { id } = useParams();

  const { data: todolist } = useFetchTodolistQuery(
    {
      authenticated,
      token,
    },
    id,
  );

  return todolist ? (
    <div id="todolist_container">
      <ListTitle
        todolistId={todolist._id}
        title={todolist.title}
        onGoingTodos={todolist.items.ongoing}
      />
      <ListNewTodo todolistId={todolist._id} />
      <ListTodos
        todolistId={todolist._id}
        onGoingTodos={todolist.items.ongoing}
        completeTodos={todolist.items.complete}
      />
    </div>
  ) : (
    <></>
  );
};
