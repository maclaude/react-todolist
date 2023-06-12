import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { ON_GOING } from '../../data/constant';
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
    .post(`http://localhost:3000/todolist/new-todolist`, payload)
    .then(({ data }) => data);

export const useNewTodolistMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: NewTodolistPayload) => newTodolist(payload),
    onSuccess: (data) => {
      queryClient.setQueryData<Todolist[]>(
        ['todolists'],
        (previousTodolists: Todolist[] | undefined): Todolist[] => [
          ...(previousTodolists || []),
          {
            _id: data._id,
            title: 'New todolist',
            status: ON_GOING,
            items: {
              ongoing: [],
              complete: [],
              delete: [],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
            __v: 1,
          },
        ],
      );

      queryClient.invalidateQueries(['todolists']);
    },
  });

const updateTodolistStatus = async (payload: UpdateTodolistStatusPayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`http://localhost:3000/todolist/status/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateTodolistStatusMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodolistStatusPayload) =>
      updateTodolistStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todolists']);
    },
  });

const updateTodolistTitle = async (payload: UpdateTodolistTitlePayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`http://localhost:3000/todolist/title/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateTodolistTitleMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodolistTitlePayload) =>
      updateTodolistTitle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todolists'], { exact: true });
    },
  });

const updateTodolistTodosOrder = async (
  payload: UpdateTodolistTodosOrderPayload,
): Promise<Todo[]> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`http://localhost:3000/todolist/todos/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateTodolistTodosOrder = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodolistTodosOrderPayload) =>
      updateTodolistTodosOrder(payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([
        'todolists',
        variables.id,
        variables.section,
      ]);
    },
  });
