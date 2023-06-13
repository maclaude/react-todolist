import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { Note } from '../../types';

type NewNotePayload = {
  title: string;
  content: string;
  token: string;
};

type UpdateNoteTitlePayload = {
  id: string;
  title: string;
  token: string;
};

type UpdateNoteContentPayload = {
  id: string;
  content: string;
  token: string;
};

const newNote = async (payload: NewNotePayload): Promise<Note> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .post(`http://localhost:3000/note/new-note`, payload)
    .then(({ data }) => data);

export const useNewNoteMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: NewNotePayload) => newNote(payload),
    onSuccess: (data) => {
      queryClient.setQueryData<Note[]>(
        ['notes'],
        (previousNotes: Note[] | undefined): Note[] => [
          ...(previousNotes || []),
          {
            _id: data._id,
            title: 'New note',
            content: '[]',
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 1,
          },
        ],
      );

      queryClient.invalidateQueries(['notes']);
    },
  });

const updateNoteTitle = async (payload: UpdateNoteTitlePayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`http://localhost:3000/note/title/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateNoteTitleMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateNoteTitlePayload) => updateNoteTitle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['notes']);
    },
  });

const updateNoteContent = async (payload: UpdateNoteContentPayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`http://localhost:3000/note/content/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateNoteContentMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateNoteContentPayload) =>
      updateNoteContent(payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['notes', variables.id]);
    },
  });
