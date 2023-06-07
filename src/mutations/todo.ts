import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Status } from '../types';

type NewTodoPayload = {
  title: string;
  status: Status;
  todolistId: string;
  token: string;
};

type UpdateTodoStatusPayload = {
  id: string;
  todolistId: string;
  currentStatus: Status;
  newStatus: Status;
  token: string;
};

type UpdateTodoTitlePayload = {
  id: string;
  title: string;
  token: string;
};

const newTodo = async (payload: NewTodoPayload) => {
  const response = await axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .post(`http://localhost:3000/todo/new-todo`, payload);

  return response.data;
};

export const useNewTodoMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: NewTodoPayload) => newTodo(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['todolists', data._id]);
    },
    onError: (error) => {
      console.error('[newTodolist] - error:', error);
    },
  });

const updateTodoStatus = async (payload: UpdateTodoStatusPayload) => {
  const response = await axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`http://localhost:3000/todo/status/${payload.id}`, payload);

  return response.data;
};

export const useUpdateTodoStatusMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodoStatusPayload) => updateTodoStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todolists']);
    },
    onError: (error) => {
      console.error('[updateTodoStatus] - error', error);
    },
  });

const updateTodoTitle = async (payload: UpdateTodoTitlePayload) => {
  const response = await axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`http://localhost:3000/todo/title/${payload.id}`, payload);

  return response.data;
};

export const useUpdateTodoTitleMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodoTitlePayload) => updateTodoTitle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todolists']);
    },
    onError: (error) => {
      console.error('[updateTodoStatus] - error', error);
    },
  });
