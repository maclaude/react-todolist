import {
  getLocalTimeZone,
  now,
  parseZonedDateTime,
} from '@internationalized/date';
import { useEffect } from 'react';

import { useFetchTodolistsQuery } from '../api/queries/user';
import { ListTodoUndraggable } from '../components/ListTodoUndraggable';
import { useAuth } from '../context/authContext';
import { DELETE, ON_GOING } from '../data/constant';
import { Todolist } from '../types';

import '../styles/Summary.scss';

const summaryTodos = (todolists: Todolist[]) =>
  todolists
    .filter(
      (todolist) =>
        todolist.status !== DELETE && todolist.items.ongoing.length > 0,
    )
    .map((todolist) => ({
      _id: todolist._id,
      title: todolist.title,
      items: todolist.items.ongoing,
    }));

const summaryIncomingTodos = (todolists: Todolist[]) =>
  todolists
    .filter(
      (todolist) =>
        todolist.status !== DELETE && todolist.items.ongoing.length > 0,
    )
    .map((todolist) => ({
      _id: todolist._id,
      title: todolist.title,
      items: [
        ...todolist.items.ongoing.filter(
          (todo) =>
            todo.date &&
            parseZonedDateTime(todo.date) > now(getLocalTimeZone()),
        ),
      ],
    }));

export const Summary = () => {
  const { token, authenticated } = useAuth();

  const { data: fetchedTodolists } = useFetchTodolistsQuery({
    authenticated,
    token,
  });

  useEffect(() => {
    // Incoming todos to be used
    if (fetchedTodolists) summaryIncomingTodos(fetchedTodolists);
  }, [fetchedTodolists]);

  return (
    <div className="summary_container box--shadow">
      <h2>En cours</h2>

      <section className="summary_section">
        {fetchedTodolists &&
          summaryTodos(fetchedTodolists).map((todolist) => (
            <div className="summary_todolist">
              <h4 className="summary_todolist-title">{todolist.title}</h4>
              <ul>
                {todolist.items.map((todo) => (
                  <ListTodoUndraggable
                    key={todo._id}
                    todoId={todo._id}
                    todolistId={todolist._id}
                    title={todo.title}
                    status={ON_GOING}
                  />
                ))}
              </ul>
            </div>
          ))}
      </section>
    </div>
  );
};
