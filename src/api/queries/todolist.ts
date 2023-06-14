import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Status, Todo, Todolist } from '../../types';
import { API_BASE_URL, QUERY_KEY } from '../constants';

type AuthContext = {
  authenticated: boolean;
  token: string;
};

type FetchTodolistTodosPayload = {
  id: string;
  status: Status;
};

const fetchTodolistById = async (
  authContext: AuthContext,
  id?: string,
): Promise<Todolist> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${authContext.token}` },
    })
    .get(`${API_BASE_URL}/todolist/${id}`)
    .then(({ data }) => data);

export const useFetchTodolistByIdQuery = (
  authContext: AuthContext,
  id?: string,
) =>
  useQuery({
    queryKey: [QUERY_KEY.TODOLISTS, id],
    enabled: Boolean(id),
    queryFn: () => fetchTodolistById(authContext, id),
  });

const fetchTodolistTodos = async (
  authContext: AuthContext,
  payload: FetchTodolistTodosPayload,
): Promise<Todo[]> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${authContext.token}` },
    })
    .get(`${API_BASE_URL}/todolist/${payload.status}/${payload.id}`)
    .then(({ data }) => data);

export const usefetchTodolistTodosQuery = (
  authContext: AuthContext,
  payload: FetchTodolistTodosPayload,
) =>
  useQuery({
    queryKey: [QUERY_KEY.TODOLISTS, payload.id, payload.status],
    enabled: Boolean(payload.id),
    queryFn: () => fetchTodolistTodos(authContext, payload),
  });
