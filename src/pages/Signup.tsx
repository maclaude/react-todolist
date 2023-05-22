import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const Signup = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="signup-container">
      <h2 className="signup-title">Inscription</h2>

      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <label className="form-label" htmlFor="firstname">
          Prénom
        </label>
        <input
          className="form-input"
          id="firstname"
          {...register('firstname', { required: true })}
        />

        <label className="form-label" htmlFor="lastname">
          Nom
        </label>
        <input
          className="form-input"
          id="lastname"
          {...register('lastname', { required: true })}
        />

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
