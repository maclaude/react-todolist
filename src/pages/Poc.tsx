import { useSendEmailMutation } from '../api/mutations/email';
import { ToasterElement } from '../components/ToasterElement';
import { useAuth } from '../context/authContext';

import '../styles/Poc.scss';

export const Poc = () => {
  const { token } = useAuth();

  const sendEmailMutation = useSendEmailMutation();

  return (
    <main id="main_container">
      <div className="poc_container box--shadow">
        <h2>Proof of concept</h2>
        <h3>Toaster</h3>
        <ToasterElement />
        <h3>Mailing</h3>
        <button
          className="btn btn_regular"
          onClick={() =>
            sendEmailMutation.mutate({
              to: 'claude.marcantoine2@gmail.com',
              subject: 'Test email',
              text: 'This is a test email',
              token,
            })
          }
        >
          Send an email
        </button>
      </div>
    </main>
  );
};
