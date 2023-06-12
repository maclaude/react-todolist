import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Todolist } from '../../types';

type AuthContext = {
  authenticated: boolean;
  token: string;
};

const fetchTodolists = async (authContext: AuthContext): Promise<Todolist[]> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${authContext.token}` },
    })
    .get(`http://localhost:3000/user/todolists`)
    .then(({ data }) => data);

export const useFetchTodolistsQuery = (authContext: AuthContext) =>
  useQuery({
    queryKey: ['todolists'],
    enabled: Boolean(authContext.authenticated),
    queryFn: () => fetchTodolists(authContext),
  });
