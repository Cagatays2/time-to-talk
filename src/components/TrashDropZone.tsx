import { useDroppable } from "@dnd-kit/core";
import { Trash2 } from "lucide-react";

type TrashDropZoneProps = {
  disabled: boolean;
};

function TrashDropZone({ disabled }: TrashDropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "trash",
    disabled,
  });

  return (
    <div
      ref={setNodeRef}
      className={[
        "inline-flex min-h-[4.75rem] w-full items-center justify-center gap-2 rounded-[1.75rem] border px-5 text-base font-black shadow-sm transition sm:min-h-[5.25rem] sm:px-6 sm:text-lg",
        disabled && "border-slate-200 bg-white text-slate-300",
        !disabled && !isOver && "border-rose-200 bg-rose-50 text-rose-800",
        !disabled && isOver && "scale-[1.02] border-rose-400 bg-rose-100 text-rose-950 ring-4 ring-rose-200",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Trash"
    >
      <Trash2 className="h-5 w-5" aria-hidden="true" />
      <span>Trash</span>
    </div>
  );
}

export default TrashDropZone;
