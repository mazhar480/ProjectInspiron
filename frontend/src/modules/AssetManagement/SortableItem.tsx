import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const SortableItem = ({ id, visible, onToggle }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="border p-2 mb-2 bg-white shadow rounded flex items-center justify-between">
      <span>{id}</span>
      <label>
        <input type="checkbox" checked={visible} onChange={onToggle} className="ml-2" />
        <span className="ml-1 text-sm">Visible</span>
      </label>
    </div>
  );
};
