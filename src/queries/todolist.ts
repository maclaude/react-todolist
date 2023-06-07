import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Todolist } from '../types';

type AuthContext = {
  authenticated: boolean;
  token: string;
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
