import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PhraseSectionData } from "../lib/phrases";
import PhraseButton from "./PhraseButton";

type PhraseCarouselProps = {
  activeIndex: number;
  sections: PhraseSectionData[];
  onSelectIndex: (index: number) => void;
  onSelectPhrase: (phrase: string) => void;
};

function PhraseCarousel({ activeIndex, sections, onSelectIndex, onSelectPhrase }: PhraseCarouselProps) {
  const activeSection = sections[activeIndex] ?? sections[0];
  const previousIndex = (activeIndex - 1 + sections.length) % sections.length;
  const nextIndex = (activeIndex + 1) % sections.length;

  return (
    <section aria-labelledby="phrase-carousel-heading" className="space-y-4">
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sections.map((section, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSelectIndex(index)}
                className={[
                  "min-h-14 shrink-0 rounded-full border px-5 text-base font-black transition focus:outline-none focus:ring-4 focus:ring-sky-300 active:scale-95",
                  isActive
                    ? "border-slate-950 bg-slate-950 text-white shadow-sm"
                    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={isActive}
              >
                {section.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onSelectIndex(previousIndex)}
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-300 active:scale-95"
            aria-label="Previous category"
          >
            <ChevronLeft className="h-7 w-7" aria-hidden="true" />
          </button>

          <div className="min-w-0 text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">{activeSection.eyebrow}</p>
            <h2 id="phrase-carousel-heading" className="text-2xl font-black tracking-normal text-slate-950 sm:text-4xl">
              {activeSection.title}
            </h2>
            <p className="mt-1 text-sm font-black text-slate-400">
              {activeIndex + 1} / {sections.length}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSelectIndex(nextIndex)}
            className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-300 active:scale-95"
            aria-label="Next category"
          >
            <ChevronRight className="h-7 w-7" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {activeSection.phrases.map((phrase) => (
            <PhraseButton key={phrase.id} label={phrase.label} tone={activeSection.tone} onSelect={onSelectPhrase} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PhraseCarousel;
