import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { useFetchTodolistByIdQuery } from '../api/queries/todolist';
import { ListNewTodo } from '../components/ListNewTodo';
import { ListTitle } from '../components/ListTitle';
import { ListTodos } from '../components/ListTodos';
import { useAuth } from '../context/authContext';
import { Todo } from './Todo';

import '../styles/List.scss';

export const List = () => {
  const { authenticated, token } = useAuth();
  const [todoId, setTodoId] = useState('');
  const { id } = useParams();

  const { data: todolist } = useFetchTodolistByIdQuery(
    {
      authenticated,
      token,
    },
    id,
  );

  useEffect(() => {
    if (todolist) {
      // Set 1st ongoing todo of the list for Todo query
      setTodoId(todolist?.items.ongoing[0]?._id);
    }
  }, [todolist]);

  return (
    <main id="main_container">
      {todolist && (
        <>
          <div id="todolist_container">
            <ListTitle
              todolistId={todolist._id}
              title={todolist.title}
              onGoingCount={todolist.items.ongoing.length}
            />
            <ListNewTodo todolistId={todolist._id} />
            <ListTodos todolistId={todolist._id} setTodoId={setTodoId} />
          </div>
          <section id="detail_container">
            <Todo todoId={todoId} />
          </section>
        </>
      )}
    </main>
  );
};
