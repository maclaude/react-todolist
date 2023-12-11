import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { ON_GOING, QUERY_KEY } from '../../data/constant';
import { API_BASE_URL } from '../../data/environment';
import { Status, Todo, Todolist } from '../../types';

type NewTodolistPayload = {
  title: string;
  status: Status;
  userId: string;
  token: string;
};

type UpdateTodolistStatusPayload = {
  id: string;
  status: Status;
  token: string;
};

type UpdateTodolistTitlePayload = {
  id: string;
  title: string;
  token: string;
};

type UpdateTodolistTodosOrderPayload = {
  id: string;
  newItems: string[];
  section: Status;
  token: string;
};

const newTodolist = async (payload: NewTodolistPayload): Promise<Todolist> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .post(`${API_BASE_URL}/todolist/new-todolist`, payload)
    .then(({ data }) => data);

export const useNewTodolistMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: NewTodolistPayload) => newTodolist(payload),
    onSuccess: (data) => {
      queryClient.setQueryData<Todolist[]>(
        [QUERY_KEY.TODOLISTS],
        (previousTodolists: Todolist[] | undefined): Todolist[] => [
          ...(previousTodolists || []),
          {
            _id: data._id,
            title: 'New todolist',
            status: ON_GOING,
            items: {
              new: [],
              ongoing: [],
              complete: [],
              delete: [],
            },
            createdAt: new Date().toDateString(),
            updatedAt: new Date().toDateString(),
            __v: 1,
          },
        ],
      );

      queryClient.invalidateQueries([QUERY_KEY.TODOLISTS]);
    },
  });

const updateTodolistStatus = async (payload: UpdateTodolistStatusPayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`${API_BASE_URL}/todolist/status/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateTodolistStatusMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodolistStatusPayload) =>
      updateTodolistStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.TODOLISTS]);
    },
  });

const updateTodolistTitle = async (payload: UpdateTodolistTitlePayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`${API_BASE_URL}/todolist/title/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateTodolistTitleMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodolistTitlePayload) =>
      updateTodolistTitle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.TODOLISTS], { exact: true });
    },
  });

const updateTodolistTodosOrder = async (
  payload: UpdateTodolistTodosOrderPayload,
): Promise<Todo[]> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`${API_BASE_URL}/todolist/todos/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateTodolistTodosOrder = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodolistTodosOrderPayload) =>
      updateTodolistTodosOrder(payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([
        QUERY_KEY.TODOLISTS,
        variables.id,
        variables.section,
      ]);
    },
  });
