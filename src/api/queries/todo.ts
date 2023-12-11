import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { QUERY_KEY } from '../../data/constant';
import { API_BASE_URL } from '../../data/environment';
import { Todo } from '../../types';

type AuthContext = {
  authenticated: boolean;
  token: string;
};

const fetchTodoById = async (
  authContext: AuthContext,
  id?: string,
): Promise<Todo> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${authContext.token}` },
    })
    .get(`${API_BASE_URL}/todo/${id}`)
    .then(({ data }) => data);

export const useFetchTodoByIdQuery = (authContext: AuthContext, id?: string) =>
  useQuery({
    queryKey: [QUERY_KEY.TODO, id],
    enabled: Boolean(id),
    queryFn: () => fetchTodoById(authContext, id),
  });
