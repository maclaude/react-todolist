import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFetchTodolistByIdQuery } from '../api/queries/todolist';
import { ListNewTodo } from '../components/ListNewTodo';
import { ListTitle } from '../components/ListTitle';
import { ListTodos } from '../components/ListTodos';
import { useAuth } from '../context/authContext';
import { Details } from './Details';

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
  }, [todolist?._id]);

  return (
    <main id="main_container">
      {todolist && (
        <>
          <div id="todolist_container" className="box--shadow">
            <ListTitle
              todolistId={todolist._id}
              title={todolist.title}
              onGoingCount={todolist.items.ongoing.length}
            />
            <ListNewTodo todolistId={todolist._id} />
            <ListTodos todolistId={todolist._id} setTodoId={setTodoId} />
          </div>
          <section id="detail_container">
            <Details todolistId={todolist._id} todoId={todoId} />
          </section>
        </>
      )}
    </main>
  );
};
