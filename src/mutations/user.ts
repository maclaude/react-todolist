import { QueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';

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

type DeleteAllTodolistsPayload = {
  token: string;
};

const signin = async (payload: SigninPayload) => {
  const response = await axios.post(
    'http://localhost:3000/auth/signin',
    payload,
  );

  return response.data;
};

export const useSigninMutation = () =>
  useMutation({
    mutationFn: (payload: SigninPayload) => signin(payload),
    onError: (error) => {
      console.error('[signin] - error:', error);
    },
  });

const signup = async (payload: SignupPayload) => {
  const response = await axios.post(
    'http://localhost:3000/auth/signup',
    payload,
  );

  return response.data;
};

export const useSignupMutation = () =>
  useMutation({
    mutationFn: (payload: SignupPayload) => signup(payload),
    onError: (error) => {
      console.error('[signup] - error:', error);
    },
  });

const deleteAllTodolists = async (payload: DeleteAllTodolistsPayload) => {
  const response = await axios
    .create({
      headers: { Authorization: `Bearer ${payload.token}` },
    })
    .delete('http://localhost:3000/user/todolists');

  return response.data;
};

export const useDeleteAllTodolistsMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: (payload: DeleteAllTodolistsPayload) =>
      deleteAllTodolists(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(['todolists']);
    },
    onError: (error) => {
      console.error('[deleteAllTodolists] - error:', error);
    },
  });
