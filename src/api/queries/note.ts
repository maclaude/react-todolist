import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Note } from '../../types';
import { API_BASE_URL, QUERY_KEY } from '../constants';

type AuthContext = {
  authenticated: boolean;
  token: string;
};

const fetchNoteById = async (
  authContext: AuthContext,
  id?: string,
): Promise<Note> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${authContext.token}` },
    })
    .get(`${API_BASE_URL}/note/${id}`)
    .then(({ data }) => data);

export const useFetchNoteByIdQuery = (authContext: AuthContext, id?: string) =>
  useQuery({
    queryKey: [QUERY_KEY.NOTES, id],
    enabled: Boolean(id),
    queryFn: () => fetchNoteById(authContext, id),
  });
