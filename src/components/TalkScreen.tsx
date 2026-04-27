import { useMemo, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Lock, Plus, Settings2 } from "lucide-react";
import PhraseCarousel from "./PhraseCarousel";
import SentenceBar from "./SentenceBar";
import { phraseSections } from "../lib/phrases";
import { composeSentence, phraseToWords } from "../lib/sentence";
import type { SentenceToken } from "../lib/tokens";

type TalkScreenProps = {
  onBack: () => void;
};

function TalkScreen({ onBack }: TalkScreenProps) {
  const [tokens, setTokens] = useState<SentenceToken[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showParentTools, setShowParentTools] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const sentence = useMemo(() => composeSentence(tokens.map((token) => token.text)), [tokens]);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 120, tolerance: 8 },
    }),
    useSensor(KeyboardSensor),
  );

  const createWordTokens = (words: string[]) =>
    words.map((word) => ({
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${word}-${Math.random()}`,
      text: word,
    }));

  const addPhrase = (phrase: string) => {
    setTokens((current) => [...current, ...createWordTokens(phraseToWords(phrase))]);
  };

  const removeToken = (tokenId: string) => {
    setTokens((current) => current.filter((token) => token.id !== tokenId));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const type = event.active.data.current?.type;
    const tokenId = event.active.data.current?.tokenId;

    if (event.over?.id === "trash" && type === "word-token" && typeof tokenId === "string") {
      removeToken(tokenId);
    }
  };

  const speakSentence = () => {
    if (!sentence || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = "en-US";
    utterance.rate = 0.88;
    utterance.pitch = 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragEnd={handleDragEnd}>
      <div className="min-h-svh px-4 pb-10 sm:px-6 lg:px-8">
        <SentenceBar
          tokens={tokens}
          sentence={sentence}
          isSpeaking={isSpeaking}
          onBack={onBack}
          onSpeak={speakSentence}
          onClear={() => setTokens([])}
          onBackspace={() => setTokens((current) => current.slice(0, -1))}
          onRemoveToken={removeToken}
        />

        <div className="mx-auto mt-5 max-w-7xl space-y-5">
          <div className="flex flex-col gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-slate-400">Builder</p>
              <h1 className="text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">Time to Talk</h1>
            </div>

            <button
              type="button"
              onClick={() => setShowParentTools((value) => !value)}
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-5 text-lg font-black text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-sky-300 active:scale-95"
              aria-pressed={showParentTools}
            >
              <Lock className="h-5 w-5" aria-hidden="true" />
              <span>Parent Edit</span>
            </button>
          </div>

          {showParentTools && (
            <section
              aria-label="Parent edit mode"
              className="grid gap-3 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3 sm:p-5"
            >
              <button
                type="button"
                disabled
                className="inline-flex min-h-16 items-center justify-center gap-3 rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 text-lg font-black text-slate-400"
              >
                <Plus className="h-5 w-5" aria-hidden="true" />
                Add Phrase
              </button>
              <button
                type="button"
                disabled
                className="inline-flex min-h-16 items-center justify-center gap-3 rounded-[1.25rem] border border-slate-200 bg-slate-50 px-4 text-lg font-black text-slate-400"
              >
                <Settings2 className="h-5 w-5" aria-hidden="true" />
                Manage Favorites
              </button>
              <div className="flex min-h-16 items-center justify-center rounded-[1.25rem] border border-dashed border-slate-300 bg-slate-50 px-4 text-lg font-black text-slate-400">
                Local State
              </div>
            </section>
          )}

          <PhraseCarousel
            sections={phraseSections}
            activeIndex={activeSectionIndex}
            onSelectIndex={setActiveSectionIndex}
            onSelectPhrase={addPhrase}
          />
        </div>
      </div>
    </DndContext>
  );
}

export default TalkScreen;
