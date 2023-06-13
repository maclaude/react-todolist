import { useParams } from 'react-router-dom';

import { useFetchNoteByIdQuery } from '../api/queries/note';
import { BlockNote } from '../components/BlockNote';
import { useAuth } from '../context/authContext';

import { NoteTitle } from '../components/NoteTitle';
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

  return fetchedNote ? (
    <div id="note_container">
      <NoteTitle noteId={fetchedNote._id} title={fetchedNote.title} />
      <section id="note_item">
        <BlockNote
          key={fetchedNote._id}
          noteId={fetchedNote._id}
          initialBlock={fetchedNote.content}
        />
      </section>
    </div>
  ) : (
    <></>
  );
};
