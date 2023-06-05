import { useMutation } from '@tanstack/react-query';
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
  status: Status;
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

export const useNewTodoMutation = () =>
  useMutation({
    mutationFn: (payload: NewTodoPayload) => newTodo(payload),
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

export const useUpdateTodoStatusMutation = () =>
  useMutation({
    mutationFn: (payload: UpdateTodoStatusPayload) => updateTodoStatus(payload),
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

export const useUpdateTodoTitleMutation = () =>
  useMutation({
    mutationFn: (payload: UpdateTodoTitlePayload) => updateTodoTitle(payload),
    onError: (error) => {
      console.error('[updateTodoStatus] - error', error);
    },
  });
