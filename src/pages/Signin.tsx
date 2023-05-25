import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import * as yup from 'yup';

import { PasswordInput } from '../components/PasswordInput';

import '../styles/Sign.scss';

const signinSchema = yup.object({
  email: yup.string().trim().required("L'email est requis"),
  password: yup.string().required('Le mot de passe est requis'),
});

type SigninData = yup.InferType<typeof signinSchema>;

type SigninPayload = {
  email: string;
  password: string;
};

export const Signin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SigninData>({
    resolver: yupResolver(signinSchema),
  });

  const signinMutation = useMutation({
    mutationFn: (payload: SigninPayload) =>
      axios.post('http://localhost:3000/auth/signin', payload),
    onSuccess: ({ data }) => {
      console.log('signin success', data);
    },
    onError: (error) => {
      // TODO Show error to the user
      console.log('signin error', error);
    },
  });

  const onSubmit: SubmitHandler<SigninData> = (data) => {
    const { email, password } = data;

    signinMutation.mutate({ email, password });
  };

  if (signinMutation.isLoading) return <PulseLoader />;

  if (signinMutation.isSuccess) return <h2>Connected</h2>;

  return (
    <div className="sign-container">
      <h2 className="sign-title">Connexion</h2>

      <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label" htmlFor="email">
          Email
        </label>
        {errors.email?.message && (
          <p className="form-error">{errors.email.message}</p>
        )}
        <input
          className="form-input"
          id="email"
          type="email"
          {...register('email', { required: true })}
        />

        <label className="form-label" htmlFor="password">
          Mot de passe
        </label>
        {errors.password?.message && (
          <p className="form-error">{errors.password.message}</p>
        )}
        <PasswordInput id="password" register={register} />

        <NavLink className="form-reset-link" to={`/user/password`}>
          Mot de passe oublié
        </NavLink>

        <input className="form-button" type="submit" value="Signin" />
      </form>

      <NavLink className="sign-link" to={`/user/signup`}>
        inscription
      </NavLink>
    </div>
  );
};
