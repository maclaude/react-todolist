import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ON_GOING } from '../../data/constant';
import { Status } from '../../types';

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

const newTodo = async (payload: NewTodoPayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .post(`http://localhost:3000/todo/new-todo`, payload)
    .then(({ data }) => data);

export const useNewTodoMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: NewTodoPayload) => newTodo(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['todolists', data._id, ON_GOING], {
        exact: true,
      });
    },
  });

const updateTodoStatus = async (payload: UpdateTodoStatusPayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`http://localhost:3000/todo/status/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateTodoStatusMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodoStatusPayload) => updateTodoStatus(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todolists']);
    },
  });

const updateTodoTitle = async (payload: UpdateTodoTitlePayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`http://localhost:3000/todo/title/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateTodoTitleMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodoTitlePayload) => updateTodoTitle(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todolists']);
    },
  });
