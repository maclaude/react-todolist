import { BlockNoteEditor } from '@blocknote/core';
import { BlockNoteView, useBlockNote } from '@blocknote/react';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { useUpdateNoteContentMutation } from '../api/mutations/note';
import { useAuth } from '../context/authContext';

import '@blocknote/core/style.css';

type BlockNoteProps = {
  noteId: string;
  initialBlock: string;
};

export const BlockNote = ({ noteId, initialBlock }: BlockNoteProps) => {
  const { token } = useAuth();
  const [block, setBlock] = useState(initialBlock);

  const udpateNoteContentMutation = useUpdateNoteContentMutation(
    useQueryClient(),
  );

  useEffect(() => {
    // TODO: Use debounce here to reduce amount of mutation
    udpateNoteContentMutation.mutate({
      id: noteId,
      content: block,
      token,
    });
  }, [block]);

  // Creates a new editor instance.
  const editor: BlockNoteEditor | null = useBlockNote({
    initialContent: JSON.parse(block),
    // Serializes and saves the editor contents to local state.
    onEditorContentChange: (blockNoteEditor) => {
      setBlock(JSON.stringify(blockNoteEditor.topLevelBlocks));
    },
  });

  return <BlockNoteView editor={editor} />;
};
