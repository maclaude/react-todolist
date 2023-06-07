import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/authContext';
import { useDeleteAllTodolistsMutation } from '../mutations/user';
import '../styles/Homepage.scss';

import avatarImg from '../assets/svg/avatar.svg';

export const HomePage = () => {
  const { logout, token } = useAuth();

  const deleteAllTodolistsMutation = useDeleteAllTodolistsMutation(
    useQueryClient(),
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="home-container">
      <div className="home-title">
        <h2>Mon compte</h2>
        <div>
          <div className="avatar">
            <img className="avatar__image" src={avatarImg} />
          </div>
        </div>
      </div>

      <section className="home-settings">
        <h3 className="settings-title">Paramètres</h3>
        <div className="settings-section">
          <a href="#">Ajouter une image de profil</a>
          <a href="#">Modifier mon email</a>
          <a href="#">Changer mon mot de passe</a>
          <a href="#">Supprimer mon compte</a>
        </div>

        <h3 className="settings-title">Reset</h3>
        <div className="settings-section">
          <a onClick={() => deleteAllTodolistsMutation.mutate({ token })}>
            Supprimer toutes les todolists
          </a>
        </div>
      </section>

      <button className="home-logout" onClick={handleLogout}>
        Déconnexion
      </button>
    </div>
  );
};
