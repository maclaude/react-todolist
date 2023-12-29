import { BiCalendarAlt, BiStar } from 'react-icons/bi';
import { BsExclamationLg, BsPlayFill } from 'react-icons/bs';
import { CgUndo } from 'react-icons/cg';
import { FiDownload } from 'react-icons/fi';
import { HiMinusSm, HiPlus } from 'react-icons/hi';
import { IoMdCheckmark } from 'react-icons/io';
import { MdDelete, MdNotes } from 'react-icons/md';
import { BeatLoader, PulseLoader, SyncLoader } from 'react-spinners';

import { ReactIcon } from '../components/ReactIcon';

import '../styles/Buttons.scss';

export const Buttons = () => {
  return (
    <main id="main_container">
      <div className="buttons-container box--shadow">
        <h2>Buttons</h2>

        <section className="buttons-section">
          <h3 className="buttons-section--title">Input icons</h3>
          <ReactIcon className="info_icon" icon={MdNotes} />
          <ReactIcon className="info_icon" icon={BiCalendarAlt} />
          <ReactIcon className="info_icon" icon={BsExclamationLg} />
        </section>

        <section className="buttons-section">
          <h3 className="buttons-section--title">Icons</h3>
          <ReactIcon className="btn btn_icon" icon={HiPlus} />
          <ReactIcon className="btn btn_icon" icon={HiMinusSm} />
          <ReactIcon className="btn btn_icon" icon={IoMdCheckmark} />
          <ReactIcon className="btn btn_icon" icon={MdDelete} />
          <ReactIcon className="btn btn_icon" icon={BsExclamationLg} />
          <ReactIcon className="btn btn_icon" icon={BsPlayFill} />
          <ReactIcon className="btn btn_icon" icon={BiStar} />
          <ReactIcon className="btn btn_icon" icon={FiDownload} />
          <ReactIcon className="btn btn_icon" icon={CgUndo} />
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

        <section className="buttons-section">
          <h3 className="buttons-section--title">Loader</h3>
          <div className="loader-section">
            <span className="loader">
              <PulseLoader loading size="10px" color="#24292f" />
            </span>
            <span className="loader">
              <BeatLoader loading size="10px" color="#24292f" />
            </span>
            <span className="loader">
              <SyncLoader loading size="10px" color="#24292f" />
            </span>
          </div>
        </section>
      </div>
    </main>
  );
};
