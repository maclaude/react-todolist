import { useMutation } from '@tanstack/react-query';
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
