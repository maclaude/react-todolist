// Modal as a separate component
import React, { useEffect, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useDeleteUserAccountMutation } from '../api/mutations/user';
import { useAuth } from '../context/authContext';
import '../styles/DialogModal.scss';

type ModalProps = {
  openModal: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

export const Modal = ({ openModal, closeModal, children }: ModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  const { logout, token } = useAuth();

  const deleteUserAccountMutation = useDeleteUserAccountMutation(
    useQueryClient(),
  );

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [openModal]);

  return (
    <dialog ref={ref} onCancel={closeModal} className="modal">
      <div className="modal-title">{children}</div>
      <section className="modal-buttons">
        <button
          className="btn btn_secondary btn_secondary--over"
          onClick={closeModal}
        >
          Annuler
        </button>
        <button
          className="btn btn_secondary btn_secondary--delete"
          onClick={() => {
            deleteUserAccountMutation.mutate({ token });
            logout();
          }}
        >
          Supprimer
        </button>
      </section>
    </dialog>
  );
};
