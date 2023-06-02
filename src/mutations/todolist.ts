import { useMutation } from '@tanstack/react-query';
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
    .patch(`http://localhost:3000/todolist/${payload.id}`, payload);

  return response.data;
};

export const useUpdateTodolistStatusMutation = () =>
  useMutation({
    mutationFn: (payload: UpdateTodolistStatusPayload) =>
      updateTodolistStatus(payload),
    onError: (error) => {
      console.error('[updateTodolistStatus] - error:', error);
    },
  });
