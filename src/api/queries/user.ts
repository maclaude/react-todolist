import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { QUERY_KEY } from '../../data/constant';
import { API_BASE_URL } from '../../data/environment';
import { Note, Todolist } from '../../types';

type AuthContext = {
  authenticated: boolean;
  token: string;
};

const fetchTodolists = async (authContext: AuthContext): Promise<Todolist[]> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${authContext.token}` },
    })
    .get(`${API_BASE_URL}/user/todolists`)
    .then(({ data }) => data);

export const useFetchTodolistsQuery = (authContext: AuthContext) =>
  useQuery({
    queryKey: [QUERY_KEY.TODOLISTS],
    enabled: Boolean(authContext.authenticated),
    queryFn: () => fetchTodolists(authContext),
  });

const fetchNotes = async (authContext: AuthContext): Promise<Note[]> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${authContext.token}` },
    })
    .get(`${API_BASE_URL}/user/notes`)
    .then(({ data }) => data);

export const useFetchNotesQuery = (authContext: AuthContext) =>
  useQuery({
    queryKey: [QUERY_KEY.NOTES],
    enabled: Boolean(authContext.authenticated),
    queryFn: () => fetchNotes(authContext),
  });
