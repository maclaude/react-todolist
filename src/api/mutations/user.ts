import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

import { Todolist } from '../../types';

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
  axios
    .post('http://localhost:3000/auth/signin', payload)
    .then(({ data }) => data);

export const useSigninMutation = () =>
  useMutation({
    mutationFn: (payload: SigninPayload) => signin(payload),
  });

const signup = async (payload: SignupPayload) =>
  axios
    .post('http://localhost:3000/auth/signup', payload)
    .then(({ data }) => data);

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
    .patch(`http://localhost:3000/user/todolists`, payload)
    .then(({ data }) => data);

export const useUpdateTodolistsOrderMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: UpdateTodolistsOrderPayload) =>
      updateTodolistsOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todolists']);
    },
  });

const deleteAllTodolists = async (payload: DeleteAllTodolistsPayload) =>
  axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .delete('http://localhost:3000/user/todolists')
    .then(({ data }) => data);

export const useDeleteAllTodolistsMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: DeleteAllTodolistsPayload) =>
      deleteAllTodolists(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todolists'], { exact: true });
    },
  });
