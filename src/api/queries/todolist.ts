import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Status, Todo, Todolist } from '../../types';

type AuthContext = {
  authenticated: boolean;
  token: string;
};

type FetchTodolistTodosPayload = {
  id: string;
  status: Status;
};

const fetchTodolist = async (
  authContext: AuthContext,
  id?: string,
): Promise<Todolist> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${authContext.token}` },
    })
    .get(`http://localhost:3000/todolist/${id}`)
    .then(({ data }) => data);

export const useFetchTodolistQuery = (authContext: AuthContext, id?: string) =>
  useQuery({
    queryKey: ['todolists', id],
    enabled: Boolean(id),
    queryFn: () => fetchTodolist(authContext, id),
  });

const fetchTodolistTodos = async (
  authContext: AuthContext,
  payload: FetchTodolistTodosPayload,
): Promise<Todo[]> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${authContext.token}` },
    })
    .get(`http://localhost:3000/todolist/${payload.status}/${payload.id}`)
    .then(({ data }) => data);

export const usefetchTodolistTodosQuery = (
  authContext: AuthContext,
  payload: FetchTodolistTodosPayload,
) =>
  useQuery({
    queryKey: ['todolists', payload.id, payload.status],
    enabled: Boolean(payload.id),
    queryFn: () => fetchTodolistTodos(authContext, payload),
  });
