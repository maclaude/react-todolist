import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { Note } from '../../types';
import { API_BASE_URL, QUERY_KEY } from '../constants';

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
    .post(`${API_BASE_URL}/note/new-note`, payload)
    .then(({ data }) => data);

export const useNewNoteMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: NewNotePayload) => newNote(payload),
    onSuccess: (data) => {
      queryClient.setQueryData<Note[]>(
        [QUERY_KEY.NOTES],
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

      queryClient.invalidateQueries([QUERY_KEY.NOTES]);
    },
  });

const updateNoteTitle = async (payload: UpdateNoteTitlePayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`${API_BASE_URL}/note/title/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateNoteTitleMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateNoteTitlePayload) => updateNoteTitle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.NOTES]);
    },
  });

const updateNoteContent = async (payload: UpdateNoteContentPayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`${API_BASE_URL}/note/content/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateNoteContentMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateNoteContentPayload) =>
      updateNoteContent(payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([QUERY_KEY.NOTES, variables.id]);
    },
  });
