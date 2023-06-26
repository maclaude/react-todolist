import { IconContext } from 'react-icons';
import { HiPlus } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { BsExclamationLg, BsPlayFill } from 'react-icons/bs';
import { BiStar } from 'react-icons/bi';
import { FiDownload } from 'react-icons/fi';

import '../styles/Buttons.scss';
import { ReactIcon } from '../components/ReactIcon';

export const Buttons = () => {
  return (
    <main id="main_container">
      <div className="buttons-container box--shadow">
        <h2>Buttons</h2>

        <section className="buttons-section">
          <h3 className="buttons-section--title">Icons</h3>
          <ReactIcon className="btn btn_icon" icon={HiPlus} />
          <ReactIcon className="btn btn_icon" icon={MdDelete} />
          <ReactIcon className="btn btn_icon" icon={BsExclamationLg} />
          <ReactIcon className="btn btn_icon" icon={BsPlayFill} />
          <ReactIcon className="btn btn_icon" icon={BiStar} />
          <ReactIcon className="btn btn_icon" icon={FiDownload} />
        </section>

        <section className="buttons-section">
          <h3 className="buttons-section--title">Regular</h3>
          <div>
            <button className="btn btn_regular">Ajouter une date</button>
            <button className="btn btn_regular">Ajouter une priorité</button>
            <button className="btn btn_regular">Commencer</button>
            <button className="btn btn_regular">Terminer</button>
            <button className="btn btn_regular">Stash</button>
          </div>
        </section>

        <section className="buttons-section">
          <h3 className="buttons-section--title">Tags</h3>
          <button className="tag">UI</button>
          <button className="tag">UX</button>
          <button className="tag">Fix</button>
          <button className="tag">Front</button>
          <button className="tag">Back</button>
          <button className="tag">CSS</button>
        </section>

        <section className="buttons-section">
          <h3 className="buttons-section--title">Secondary</h3>
          <button className="btn btn_secondary btn_secondary--add">
            Ajouter
          </button>
          <button className="btn btn_secondary btn_secondary--delete">
            Supprimer
          </button>
          <button className="btn btn_secondary btn_secondary--over">
            Terminer
          </button>
        </section>
      </div>
    </main>
  );
};
