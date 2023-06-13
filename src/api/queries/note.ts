import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Note } from '../../types';

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
    .get(`http://localhost:3000/note/${id}`)
    .then(({ data }) => data);

export const useFetchNoteByIdQuery = (authContext: AuthContext, id?: string) =>
  useQuery({
    queryKey: ['notes', id],
    enabled: Boolean(id),
    queryFn: () => fetchNoteById(authContext, id),
  });
