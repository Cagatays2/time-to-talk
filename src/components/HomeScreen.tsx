import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

type HomeScreenProps = {
  onStart: () => void;
};

function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <section className="flex min-h-svh items-center justify-center px-5 py-10 sm:px-8">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 lg:grid-cols-[1fr_0.92fr]">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 shadow-sm">
            <Sparkles className="h-4 w-4 text-sky-600" aria-hidden="true" />
            Family communication
          </div>

          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-normal text-slate-950 sm:text-7xl">
              Time to Talk
            </h1>
            <p className="max-w-2xl text-xl font-medium leading-8 text-slate-600 sm:text-2xl">
              Build clear, polite sentences with large touch buttons and spoken output.
            </p>
          </div>

          <button
            type="button"
            onClick={onStart}
            className="group flex min-h-24 w-full max-w-xl items-center justify-between rounded-[2rem] bg-slate-950 px-7 py-6 text-left text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus:ring-4 focus:ring-sky-300 active:translate-y-0 sm:px-9"
          >
            <span className="flex items-center gap-5">
              <span className="grid h-14 w-14 place-items-center rounded-3xl bg-white text-slate-950 shadow-inner">
                <MessageCircle className="h-8 w-8" aria-hidden="true" />
              </span>
              <span className="text-3xl font-black sm:text-4xl">Time to Talk</span>
            </span>
            <span className="transition group-hover:translate-x-1" aria-hidden="true">
              <ArrowRight className="h-10 w-10" />
            </span>
          </button>
        </div>

        <div className="rounded-[2rem] border border-white bg-white/80 p-4 shadow-soft backdrop-blur sm:p-5">
          <div className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-slate-950 p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="h-3 w-16 rounded-full bg-slate-700" />
              <div className="h-3 w-3 rounded-full bg-emerald-300" />
            </div>
            <div className="space-y-3 rounded-[1.25rem] bg-slate-50 p-4">
              <div className="flex flex-wrap gap-2 rounded-2xl border border-sky-200 bg-sky-50 p-3">
                {["Mom", "can", "you", "please", "give", "me", "the", "iPad"].map((token) => (
                  <span
                    key={token}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-lg font-bold text-slate-800 shadow-sm"
                  >
                    {token}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {["I want", "Can I please have", "water", "thank you"].map((phrase, index) => (
                  <div
                    key={phrase}
                    className={[
                      "min-h-16 rounded-3xl border px-4 py-4 text-lg font-black shadow-sm",
                      index === 0 && "border-indigo-200 bg-indigo-50 text-indigo-950",
                      index === 1 && "border-sky-200 bg-sky-50 text-sky-950",
                      index === 2 && "border-emerald-200 bg-emerald-50 text-emerald-950",
                      index === 3 && "border-amber-200 bg-amber-50 text-amber-950",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {phrase}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeScreen;
