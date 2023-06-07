import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Status, Todo, Todolist } from '../types';

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
): Promise<Todolist> => {
  const response = await axios
    .create({
      headers: { Authorization: `Bearer ${authContext.token}` },
    })
    .get(`http://localhost:3000/todolist/${id}`);

  return response.data;
};

export const useFetchTodolistQuery = (authContext: AuthContext, id?: string) =>
  useQuery({
    queryKey: ['todolists', id],
    enabled: Boolean(id),
    queryFn: () => fetchTodolist(authContext, id),
  });

const fetchTodolistTodos = async (
  authContext: AuthContext,
  payload: FetchTodolistTodosPayload,
): Promise<Todo[]> => {
  const response = await axios
    .create({
      headers: { Authorization: `Bearer ${authContext.token}` },
    })
    .get(`http://localhost:3000/todolist/${payload.status}/${payload.id}`);

  return response.data;
};

export const usefetchTodolistTodosQuery = (
  authContext: AuthContext,
  payload: FetchTodolistTodosPayload,
) =>
  useQuery({
    queryKey: ['todolists', payload.id, payload.status],
    enabled: Boolean(payload.id),
    queryFn: () => fetchTodolistTodos(authContext, payload),
  });
