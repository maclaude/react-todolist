import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import PulseLoader from 'react-spinners/PulseLoader';

import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { PasswordInput } from '../components/PasswordInput';

import '../styles/Sign.scss';

const signupSchema = yup.object({
  firstname: yup.string().trim().required('Le prénom est requis'),
  lastname: yup.string().trim().required('Le nom est requis'),
  email: yup.string().trim().required("L'email est requis"),
  password: yup.string().required('Le mot de passe est requis'),
  confirm_password: yup
    .string()
    .required('La confirmation de mot de passe est requise')
    .oneOf([yup.ref('password')], 'Les mots de passe ne sont pas identiques'),
});

type SignupData = yup.InferType<typeof signupSchema>;

type SignupPayload = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export const Signup = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupData>({
    resolver: yupResolver(signupSchema),
  });

  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: (payload: SignupPayload) =>
      axios.post('http://localhost:3000/auth/signup', payload),
    onSuccess: ({ data }) => {
      navigate(`/user/signin`, { state: { userId: data.user } });
      console.log('signup success', data);
    },
    onError: (error) => {
      // TODO Show error to the user
      console.log('signup error', error);
    },
  });

  const onSubmit: SubmitHandler<SignupData> = (data) => {
    const { firstname, lastname, email, password } = data;

    signupMutation.mutate({
      firstname,
      lastname,
      email,
      password,
    });
  };

  if (signupMutation.isLoading) return <PulseLoader />;

  return (
    <div className="sign-container">
      <h2 className="sign-title">Inscription</h2>

      <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label" htmlFor="firstname">
          Prénom
        </label>
        {errors.firstname?.message && (
          <p className="form-error">{errors.firstname.message}</p>
        )}
        <input
          className="form-input"
          id="firstname"
          {...register('firstname')}
        />

        <label className="form-label" htmlFor="lastname">
          Nom
        </label>
        {errors.lastname?.message && (
          <p className="form-error">{errors.lastname.message}</p>
        )}
        <input className="form-input" id="lastname" {...register('lastname')} />

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
          {...register('email')}
        />

        <label className="form-label" htmlFor="password">
          Mot de passe
        </label>
        {errors.password?.message && (
          <p className="form-error">{errors.password.message}</p>
        )}
        <PasswordInput id="password" register={register} />

        <label className="form-label" htmlFor="confirm_password">
          Confirmation mot de passe
        </label>
        {errors.confirm_password?.message && (
          <p className="form-error">{errors.confirm_password.message}</p>
        )}
        <PasswordInput id="confirm_password" register={register} />

        <input className="form-button" type="submit" value="Signup" />
      </form>

      <NavLink className="sign-link" to={`/user/signin`}>
        connexion
      </NavLink>
    </div>
  );
};
