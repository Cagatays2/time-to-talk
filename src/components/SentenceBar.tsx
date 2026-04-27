import { useDroppable } from "@dnd-kit/core";
import { ArrowLeft, Delete, RotateCcw, Volume2 } from "lucide-react";
import type { SentenceToken } from "../lib/tokens";
import SentenceWordToken from "./SentenceWordToken";
import TrashDropZone from "./TrashDropZone";

type SentenceBarProps = {
  tokens: SentenceToken[];
  sentence: string;
  isSpeaking: boolean;
  onBack: () => void;
  onSpeak: () => void;
  onClear: () => void;
  onBackspace: () => void;
  onRemoveToken: (tokenId: string) => void;
};

function SentenceBar({ tokens, sentence, isSpeaking, onBack, onSpeak, onClear, onBackspace, onRemoveToken }: SentenceBarProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: "sentence-builder",
  });

  const canSpeak = sentence.length > 0;

  return (
    <header className="sticky top-0 z-40 -mx-4 border-b border-slate-200/80 bg-slate-50/92 px-4 pb-4 pt-[calc(env(safe-area-inset-top)+0.75rem)] backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-3">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex min-h-14 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-lg font-black text-slate-700 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-300 active:scale-95"
            aria-label="Back"
          >
            <ArrowLeft className="h-6 w-6" aria-hidden="true" />
            <span>Back</span>
          </button>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <button
              type="button"
              onClick={onBackspace}
              disabled={tokens.length === 0}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-base font-black text-slate-700 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-16 sm:px-6 sm:text-lg"
              aria-label="Backspace"
              title="Backspace"
            >
              <Delete className="h-5 w-5" aria-hidden="true" />
              <span>Backspace</span>
            </button>
            <button
              type="button"
              onClick={onClear}
              disabled={tokens.length === 0}
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-base font-black text-slate-700 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-16 sm:px-6 sm:text-lg"
              aria-label="Clear sentence"
              title="Clear"
            >
              <RotateCcw className="h-5 w-5" aria-hidden="true" />
              <span>Clear</span>
            </button>
            <button
              type="button"
              onClick={onSpeak}
              disabled={!canSpeak}
              className="inline-flex min-h-14 items-center gap-2 rounded-full bg-slate-950 px-6 text-base font-black text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-sky-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-16 sm:px-7 sm:text-lg"
            >
              <Volume2 className="h-5 w-5" aria-hidden="true" />
              <span>{isSpeaking ? "Speaking" : "Speak"}</span>
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_10rem] lg:grid-cols-[1fr_12rem]">
          <div
            ref={setNodeRef}
            className={[
              "min-h-[4.75rem] rounded-[1.75rem] border bg-white p-3 shadow-soft transition sm:min-h-[5.25rem] sm:p-3",
              isOver ? "border-sky-300 ring-4 ring-sky-200/80" : "border-slate-200",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label="Sentence builder"
          >
            {tokens.length > 0 ? (
              <div className="flex h-full flex-wrap content-start gap-2">
                {tokens.map((token) => (
                  <SentenceWordToken key={token.id} token={token} onRemove={onRemoveToken} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[3.2rem] items-center justify-center rounded-[1.25rem] border border-dashed border-slate-300 bg-slate-50 px-4 text-center text-lg font-bold text-slate-400 sm:text-xl">
                Tap words below to build a sentence
              </div>
            )}
          </div>

          <div className="flex items-stretch">
            <div className="flex w-full items-center justify-center">
              <TrashDropZone disabled={tokens.length === 0} />
            </div>
          </div>
        </div>

        <p className="min-h-7 px-2 text-xl font-black leading-7 text-slate-900 sm:text-2xl">
          {sentence || " "}
        </p>
      </div>
    </header>
  );
}

export default SentenceBar;
