import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Todolist } from '../types';

type AuthContext = {
  authenticated: boolean;
  token: string;
};

export type FetchTodolistsData = Todolist[];

const fetchTodolists = async (
  authContext: AuthContext,
): Promise<FetchTodolistsData> => {
  const response = await axios
    .create({
      headers: { Authorization: `Bearer ${authContext.token}` },
    })
    .get(`http://localhost:3000/user/todolists`);

  return response.data;
};

export const useFetchTodolistsQuery = (authContext: AuthContext) =>
  useQuery({
    queryKey: ['todolists'],
    enabled: Boolean(authContext.authenticated),
    queryFn: () => fetchTodolists(authContext),
  });
