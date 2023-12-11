import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { ON_GOING, QUERY_KEY } from '../../data/constant';
import { API_BASE_URL } from '../../data/environment';
import { Note, Status } from '../../types';

type NewNotePayload = {
  title: string;
  status: Status;
  content: string;
  token: string;
};

type UpdateNoteStatusPayload = {
  id: string;
  status: Status;
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
            status: ON_GOING,
            content: '[]',
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
            __v: 1,
          },
        ],
      );

      queryClient.invalidateQueries([QUERY_KEY.NOTES]);
    },
  });

const updateNoteStatus = async (payload: UpdateNoteStatusPayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`${API_BASE_URL}/note/status/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateNoteStatusMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateNoteStatusPayload) => updateNoteStatus(payload),
    onSuccess: () => {
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
