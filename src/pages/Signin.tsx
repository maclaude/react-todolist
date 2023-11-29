import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import * as yup from 'yup';

import { useSigninMutation } from '../api/mutations/user';
import { PasswordInput } from '../components/PasswordInput';
import { useAuth } from '../context/authContext';

import '../styles/Sign.scss';

const signinSchema = yup.object({
  email: yup.string().trim().required("L'email est requis"),
  password: yup.string().required('Le mot de passe est requis'),
});

type SigninData = yup.InferType<typeof signinSchema>;

export const Signin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { mutate, isLoading, isSuccess, data } = useSigninMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SigninData>({
    resolver: yupResolver(signinSchema),
  });

  useEffect(() => {
    if (isSuccess && data?.user && data?.token) {
      // Set authContext credentials
      login(data.user.id, data.token);

      // Navigate back to user dashboard
      navigate('/user');
    }
  }, [isSuccess, data]);

  const onSubmit: SubmitHandler<SigninData> = ({ email, password }) => {
    mutate({ email, password });
  };

  if (isLoading)
    return (
      <main id="central_container">
        <div className="sign-container box--shadow">
          <span className="sign-loader">
            <PulseLoader />
          </span>
        </div>
      </main>
    );

  // - `errors` | form validation errors
  // - `data` | API signin request errors

  return (
    <main id="central_container">
      <div className="sign-container box--shadow">
        <h2 className="sign-title">Connexion</h2>

        <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          {(errors.email?.message ||
            (data?.error?.code === 1 && data.error.message)) && (
            <p className="form-error">
              {errors.email?.message || data?.error?.message}
            </p>
          )}
          <input
            className="form-input"
            type="email"
            id="email"
            {...register('email', { required: true })}
          />
          <label className="form-label" htmlFor="password">
            Mot de passe
          </label>

          {(errors.password?.message ||
            (data?.error?.code === 2 && data.error.message)) && (
            <p className="form-error">
              {errors.password?.message || data?.error?.message}
            </p>
          )}
          <PasswordInput id="password" register={register} />
          <NavLink className="form-reset-link" to={`/user/password`}>
            Mot de passe oublié
          </NavLink>
          <input className="form-button" type="submit" value="Connexion" />
        </form>

        <NavLink className="sign-link" to={`/user/signup`}>
          inscription
        </NavLink>
      </div>
    </main>
  );
};
