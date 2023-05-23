import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import { PasswordInput } from '../components/PasswordInput';

const signinSchema = yup.object({
  email: yup.string().trim().required("L'email est requis"),
  password: yup
    .string()
    .required('Le mot de passe est requis')
    .matches(
      /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
      'Le mot de passe doit faire au minimum 8 caractères et doit contenir une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
    ),
});

type SigninData = yup.InferType<typeof signinSchema>;

export const Signin = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SigninData>({
    resolver: yupResolver(signinSchema),
  });

  const onSubmit: SubmitHandler<SigninData> = (data) => {
    console.log(data);
  };

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
