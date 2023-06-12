import { useParams } from 'react-router-dom';

import { useFetchTodolistQuery } from '../api/queries/todolist';
import { ListNewTodo } from '../components/ListNewTodo';
import { ListTitle } from '../components/ListTitle';
import { ListTodos } from '../components/ListTodos';
import { useAuth } from '../context/authContext';

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
        onGoingCount={todolist.items.ongoing.length}
      />
      <ListNewTodo todolistId={todolist._id} />
      <ListTodos todolistId={todolist._id} />
    </div>
  ) : (
    <></>
  );
};
