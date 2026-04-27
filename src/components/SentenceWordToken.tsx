import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import type { SentenceToken } from "../lib/tokens";

type SentenceWordTokenProps = {
  token: SentenceToken;
  onRemove: (tokenId: string) => void;
};

function SentenceWordToken({ token, onRemove }: SentenceWordTokenProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: token.id,
    data: { type: "word-token", tokenId: token.id },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={[
        "inline-flex min-h-12 select-none items-center gap-1 rounded-full border border-slate-200 bg-slate-50 py-1 pl-4 pr-1 text-lg font-black text-slate-800 shadow-sm transition sm:text-xl",
        isDragging && "z-50 scale-105 border-rose-300 bg-rose-50 text-rose-950 shadow-lift",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span>{token.text}</span>
      <button
        type="button"
        className="grid h-9 w-9 place-items-center rounded-full text-slate-500 transition hover:bg-white hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-200 active:scale-95"
        onClick={() => onRemove(token.id)}
        aria-label={`Remove ${token.text}`}
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="grid h-9 w-9 cursor-grab place-items-center rounded-full text-slate-400 transition hover:bg-white hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-sky-200 active:cursor-grabbing active:scale-95"
        aria-label={`Drag ${token.text}`}
        title="Drag"
        {...listeners}
        {...attributes}
      >
        <GripVertical className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}

export default SentenceWordToken;
