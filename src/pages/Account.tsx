import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import { useDeleteAllTodolistsMutation } from '../api/mutations/user';
import { Modal } from '../components/DialogModal';
import { useAuth } from '../context/authContext';

import avatarImg from '../assets/svg/avatar.svg';
import '../styles/Account.scss';

export const Account = () => {
  const { logout, token } = useAuth();
  const [modal, setModal] = useState(false);

  const deleteAllTodolistsMutation = useDeleteAllTodolistsMutation(
    useQueryClient(),
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="account-container box--shadow">
      <div className="account-title">
        <h2>Mon compte</h2>
        <div>
          <div className="avatar">
            <img className="avatar__image" src={avatarImg} />
          </div>
        </div>
      </div>

      <section className="account-settings">
        <h3 className="settings-title">Paramètres</h3>
        <div className="settings-section">
          <a href="#">Ajouter une image de profil</a>
          <a href="#">Modifier mon email</a>
          <a href="#">Changer mon mot de passe</a>
          <a onClick={() => setModal(true)}>Supprimer mon compte</a>

          <Modal openModal={modal} closeModal={() => setModal(false)}>
            Êtes-vous certain de vouloir supprimer votre compte ?
          </Modal>
        </div>

        <h3 className="settings-title">Reset</h3>
        <div className="settings-section">
          <a onClick={() => deleteAllTodolistsMutation.mutate({ token })}>
            Supprimer toutes les todolists
          </a>
        </div>
      </section>

      <button className="account-logout" onClick={handleLogout}>
        Déconnexion
      </button>
    </div>
  );
};
