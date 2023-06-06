import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type TestDndItemProps = {
  id: string;
  title: string;
};

export const PocDragAndDropElement = ({ id, title }: TestDndItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="dnd_item"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <p>{title}</p>
    </div>
  );
};
