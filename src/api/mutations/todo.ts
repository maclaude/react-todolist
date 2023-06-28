import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { ON_GOING } from '../../data/constant';
import { Status } from '../../types';
import { API_BASE_URL, QUERY_KEY } from '../constants';

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

type UpdateTodoDetailsPayload = {
  id: string;
  title: string;
  notes: string;
  token: string;
  date?: string;
  priority?: string;
};

const newTodo = async (payload: NewTodoPayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .post(`${API_BASE_URL}/todo/new-todo`, payload)
    .then(({ data }) => data);

export const useNewTodoMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: NewTodoPayload) => newTodo(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries([QUERY_KEY.TODOLISTS, data._id, ON_GOING], {
        exact: true,
      });
    },
  });

const updateTodoStatus = async (payload: UpdateTodoStatusPayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`${API_BASE_URL}/todo/status/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateTodoStatusMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodoStatusPayload) => updateTodoStatus(payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([QUERY_KEY.TODO, variables.id]);
      queryClient.invalidateQueries([QUERY_KEY.TODOLISTS]);
    },
  });

const updateTodoTitle = async (payload: UpdateTodoTitlePayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`${API_BASE_URL}/todo/title/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateTodoTitleMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodoTitlePayload) => updateTodoTitle(payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([QUERY_KEY.TODOLISTS]);
      queryClient.invalidateQueries([QUERY_KEY.TODO, variables.id]);
    },
  });

const updateTodoDetails = async (payload: UpdateTodoDetailsPayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`${API_BASE_URL}/todo/details/${payload.id}`, payload)
    .then(({ data }) => data);

export const useUpdateTodoDetailsMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodoDetailsPayload) =>
      updateTodoDetails(payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries([QUERY_KEY.TODOLISTS]);
      queryClient.invalidateQueries([QUERY_KEY.TODO, variables.id]);
    },
  });
