import { ToasterElement } from '../components/ToasterElement';

import '../styles/Toaster.scss';

export const Toaster = () => {
  return (
    <main id="main_container">
      <div className="toaster_container box--shadow">
        <h2>Toaster</h2>
        <ToasterElement />
      </div>
    </main>
  );
};
