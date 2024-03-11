import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, Navigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import * as yup from 'yup';

import { useSignupMutation } from '../api/mutations/user';
import { PasswordInput } from '../components/PasswordInput';

import '../styles/Sign.scss';

const signupSchema = yup.object({
  firstname: yup.string().trim().required('Le prénom est requis'),
  lastname: yup.string().trim().required('Le nom est requis'),
  email: yup.string().trim().required("L'email est requis"),
  password: yup
    .string()
    .required('Le mot de passe est requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
      'Le mot de passe doit contenir au moins un chiffre et un caractère spécial',
    ),
  confirm_password: yup
    .string()
    .required('La confirmation de mot de passe est requise')
    .oneOf([yup.ref('password')], 'Les mots de passe ne sont pas identiques'),
});

type SignupData = yup.InferType<typeof signupSchema>;

export const Signup = () => {
  const { mutate, isLoading, isSuccess, data } = useSignupMutation();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignupData>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupData> = ({
    firstname,
    lastname,
    email,
    password,
  }) => {
    mutate({
      firstname,
      lastname,
      email,
      password,
    });
  };

  if (isSuccess && data?.userId) {
    return <Navigate to="/user/signin" replace />;
  }

  if (isLoading)
    return (
      <>
        <PulseLoader />;
      </>
    );

  // - `errors` | form validation errors
  // - `data` | API signup request errors

  return (
    <>
      <div className="sign-container box--shadow">
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
          <input
            className="form-input"
            id="lastname"
            {...register('lastname')}
          />

          <label className="form-label" htmlFor="email">
            Email
          </label>
          {(errors.email?.message ||
            (data?.error?.code === 3 && data.error.message)) && (
            <p className="form-error">
              {errors.email?.message || data?.error?.message}
            </p>
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

          <input className="form-button" type="submit" value="Inscription" />
        </form>

        <NavLink className="sign-link" to={`/user/signin`}>
          connexion
        </NavLink>
      </div>
    </>
  );
};
