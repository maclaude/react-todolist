import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { Status } from '../types';

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

const newTodolist = async (payload: NewTodolistPayload) => {
  const response = await axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .post(`http://localhost:3000/todolist/new-todolist`, payload);

  return response.data;
};

export const useNewTodolistMutation = () =>
  useMutation({
    mutationFn: (payload: NewTodolistPayload) => newTodolist(payload),
    onError: (error) => {
      console.error('[newTodolist] - error:', error);
    },
  });

const updateTodolistStatus = async (payload: UpdateTodolistStatusPayload) => {
  const response = await axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`http://localhost:3000/todolist/status/${payload.id}`, payload);

  return response.data;
};

export const useUpdateTodolistStatusMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodolistStatusPayload) =>
      updateTodolistStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todolists']);
    },
    onError: (error) => {
      console.error('[updateTodolistStatus] - error:', error);
    },
  });

const updateTodolistTitle = async (payload: UpdateTodolistTitlePayload) => {
  const response = await axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`http://localhost:3000/todolist/title/${payload.id}`, payload);

  return response.data;
};

export const useUpdateTodolistTitleMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodolistTitlePayload) =>
      updateTodolistTitle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todolists']);
    },
    onError: (error) => {
      console.error('[updateTodolistTitle] - error:', error);
    },
  });

const updateTodolistTodosOrder = async (
  payload: UpdateTodolistTodosOrderPayload,
) => {
  const response = await axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`http://localhost:3000/todolist/todos/${payload.id}`, payload);

  return response.data;
};

export const useUpdateTodolistTodosOrder = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodolistTodosOrderPayload) =>
      updateTodolistTodosOrder(payload),
    onSuccess: (data, variables) => {
      // TODO: setQueryData with data return onGoingTodos

      queryClient.invalidateQueries([
        'todolists',
        variables.id,
        variables.section,
      ]);
    },
    onError: (error) => {
      console.error('[updateTodolistTodosOrder] - error:', error);
    },
  });
