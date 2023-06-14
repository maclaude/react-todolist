import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { Todolist } from '../../types';
import { API_BASE_URL, QUERY_KEY } from '../constants';

type SigninPayload = {
  email: string;
  password: string;
};

type SignupPayload = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

type UpdateTodolistsOrderPayload = {
  newItems: string[];
  token: string;
};

type DeleteAllTodolistsPayload = {
  token: string;
};

const signin = async (payload: SigninPayload) =>
  axios.post(`${API_BASE_URL}/auth/signin`, payload).then(({ data }) => data);

export const useSigninMutation = () =>
  useMutation({
    mutationFn: (payload: SigninPayload) => signin(payload),
  });

const signup = async (payload: SignupPayload) =>
  axios.post(`${API_BASE_URL}/auth/signup`, payload).then(({ data }) => data);

export const useSignupMutation = () =>
  useMutation({
    mutationFn: (payload: SignupPayload) => signup(payload),
  });

const updateTodolistsOrder = async (
  payload: UpdateTodolistsOrderPayload,
): Promise<Todolist[]> =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .patch(`${API_BASE_URL}/user/todolists`, payload)
    .then(({ data }) => data);

export const useUpdateTodolistsOrderMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodolistsOrderPayload) =>
      updateTodolistsOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.TODOLISTS]);
    },
  });

const deleteAllTodolists = async (payload: DeleteAllTodolistsPayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .delete(`${API_BASE_URL}/user/todolists`)
    .then(({ data }) => data);

export const useDeleteAllTodolistsMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: DeleteAllTodolistsPayload) =>
      deleteAllTodolists(payload),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY.TODOLISTS], { exact: true });
    },
  });
