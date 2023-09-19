import { useParams } from 'react-router-dom';

import { useFetchNoteByIdQuery } from '../api/queries/note';
import { BlockNote } from '../components/BlockNote';
import { NoteTitle } from '../components/NoteTitle';
import { useAuth } from '../context/authContext';

import '../styles/Note.scss';

export const Note = () => {
  const { authenticated, token } = useAuth();
  const { id } = useParams();

  const { data: fetchedNote } = useFetchNoteByIdQuery(
    {
      authenticated,
      token,
    },
    id,
  );

  return (
    <main id="main_container">
      {fetchedNote && (
        <div id="note_container" className="box--shadow">
          <NoteTitle noteId={fetchedNote._id} title={fetchedNote.title} />
          <section id="note_item">
            <BlockNote
              key={fetchedNote._id}
              noteId={fetchedNote._id}
              initialBlock={fetchedNote.content}
            />
          </section>
        </div>
      )}
    </main>
  );
};
