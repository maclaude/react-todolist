import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useUpdateNoteTitleMutation } from '../api/mutations/note';
import { useAuth } from '../context/authContext';

interface NoteTitleProps {
  noteId: string;
  title: string;
}

export const NoteTitle = ({ noteId, title }: NoteTitleProps) => {
  const { token } = useAuth();
  const [noteTitle, setNoteTitle] = useState<string>(title);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNoteTitle(event.currentTarget.value);
  };

  useEffect(() => {
    setNoteTitle(title);
  }, [title]);

  const handleOnEnterBlur = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.currentTarget.blur();
    }
  };

  const updateNoteTitleMutation = useUpdateNoteTitleMutation(useQueryClient());

  return (
    <div id="note_title">
      <input
        id="note_title__input"
        onChange={(e) => handleChange(e)}
        onKeyDown={(e) => handleOnEnterBlur(e)}
        onBlur={() =>
          updateNoteTitleMutation.mutate({
            id: noteId,
            title: noteTitle,
            token,
          })
        }
        value={noteTitle}
      />
    </div>
  );
};
