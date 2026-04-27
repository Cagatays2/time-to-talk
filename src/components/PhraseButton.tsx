import type { PhraseSectionData } from "../lib/phrases";

const toneClasses: Record<PhraseSectionData["tone"], string> = {
  sky: "border-sky-200 bg-sky-50 text-sky-950 hover:border-sky-300 hover:bg-sky-100 focus:ring-sky-300",
  cyan: "border-cyan-200 bg-cyan-50 text-cyan-950 hover:border-cyan-300 hover:bg-cyan-100 focus:ring-cyan-300",
  indigo:
    "border-indigo-200 bg-indigo-50 text-indigo-950 hover:border-indigo-300 hover:bg-indigo-100 focus:ring-indigo-300",
  emerald:
    "border-emerald-200 bg-emerald-50 text-emerald-950 hover:border-emerald-300 hover:bg-emerald-100 focus:ring-emerald-300",
  amber:
    "border-amber-200 bg-amber-50 text-amber-950 hover:border-amber-300 hover:bg-amber-100 focus:ring-amber-300",
  rose: "border-rose-200 bg-rose-50 text-rose-950 hover:border-rose-300 hover:bg-rose-100 focus:ring-rose-300",
  teal: "border-teal-200 bg-teal-50 text-teal-950 hover:border-teal-300 hover:bg-teal-100 focus:ring-teal-300",
  violet:
    "border-violet-200 bg-violet-50 text-violet-950 hover:border-violet-300 hover:bg-violet-100 focus:ring-violet-300",
  slate:
    "border-slate-200 bg-slate-50 text-slate-950 hover:border-slate-300 hover:bg-slate-100 focus:ring-slate-300",
};

type PhraseButtonProps = {
  label: string;
  tone: PhraseSectionData["tone"];
  onSelect: (phrase: string) => void;
};

function PhraseButton({ label, tone, onSelect }: PhraseButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(label)}
      className={[
        "min-h-[5rem] select-none rounded-[1.45rem] border px-5 py-4 text-left text-xl font-black leading-tight shadow-sm transition focus:outline-none focus:ring-4 active:scale-[0.98] sm:text-2xl",
        toneClasses[tone],
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={`Add ${label}`}
    >
      {label}
    </button>
  );
}

export default PhraseButton;
