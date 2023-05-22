import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  email: string;
  password: string;
}

export const Signin = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="sign-container">
      <h2 className="sign-title">Connexion</h2>

      <form className="sign-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label" htmlFor="email">
          Email
        </label>
        <input
          className="form-input"
          id="email"
          type="email"
          {...register('email', { required: true })}
        />

        <label className="form-label" htmlFor="password">
          Mot de passe
        </label>
        <input
          className="form-input"
          id="password"
          type="password"
          {...register('password', { required: true, minLength: 8 })}
        />

        <input className="form-button" type="submit" />
      </form>
    </div>
  );
};
