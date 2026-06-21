import Link from "next/link";
import { questions } from "../lib/problems";

const difficultyConfig: Record<
  string,
  { text: string; bar: string; glow: string; badge: string }
> = {
  Easy: {
    text: "text-emerald-300",
    bar: "bg-emerald-400",
    glow: "group-hover:shadow-[0_0_0_1px_rgba(52,211,153,0.4),0_0_24px_-4px_rgba(52,211,153,0.5)]",
    badge:
      "bg-emerald-400/10 text-emerald-300 ring-1 ring-inset ring-emerald-400/30",
  },
  Medium: {
    text: "text-amber-300",
    bar: "bg-amber-400",
    glow: "group-hover:shadow-[0_0_0_1px_rgba(251,191,36,0.4),0_0_24px_-4px_rgba(251,191,36,0.5)]",
    badge: "bg-amber-400/10 text-amber-300 ring-1 ring-inset ring-amber-400/30",
  },
  Hard: {
    text: "text-rose-300",
    bar: "bg-rose-400",
    glow: "group-hover:shadow-[0_0_0_1px_rgba(251,113,133,0.4),0_0_24px_-4px_rgba(251,113,133,0.5)]",
    badge: "bg-rose-400/10 text-rose-300 ring-1 ring-inset ring-rose-400/30",
  },
};

export default function Home() {
  const counts = {
    Easy: questions.filter((q) => q.difficulty === "Easy").length,
    Medium: questions.filter((q) => q.difficulty === "Medium").length,
    Hard: questions.filter((q) => q.difficulty === "Hard").length,
  };

  return (
    <div className="min-h-screen bg-[#0B0B1A] text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-violet-600/30 blur-[120px]" />
        <div className="absolute top-20 right-0 h-[24rem] w-[24rem] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[20rem] w-[20rem] rounded-full bg-fuchsia-600/20 blur-[120px]" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 ring-1 ring-white/10 backdrop-blur-sm text-xs font-mono tracking-widest text-violet-300 mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
              ./cpp_practice --init
            </div>
            <h1 className="font-mono text-5xl sm:text-6xl font-bold tracking-tight leading-[1.05] mb-4">
              <span className="bg-gradient-to-br from-white via-violet-200 to-cyan-300 bg-clip-text text-transparent">
                Sharpen
              </span>
              <br />
              your C++.
            </h1>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">
              Data structures, algorithms, and systems programming — one problem
              at a time.
            </p>
          </div>

          <div className="flex sm:flex-col gap-3 sm:gap-2 shrink-0">
            {(["Easy", "Medium", "Hard"] as const).map((d) => (
              <div
                key={d}
                className="flex items-center gap-3 bg-white/[0.03] ring-1 ring-white/10 rounded-xl px-4 py-2 backdrop-blur-sm"
              >
                <span
                  className={`h-2 w-2 rounded-full ${difficultyConfig[d].bar}`}
                />
                <span className="text-xs text-slate-400 uppercase tracking-wider w-14">
                  {d}
                </span>
                <span className="font-mono font-bold text-white tabular-nums ml-auto sm:ml-2">
                  {counts[d]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {questions.map((question, idx) => {
            const cfg = difficultyConfig[question.difficulty];
            return (
              <Link key={question.id} href={`/problems/${question.id}`}>
                <div
                  className={`group relative flex items-center gap-5 bg-white/[0.03] hover:bg-white/[0.06] ring-1 ring-white/10 hover:ring-white/20 rounded-2xl pl-0 pr-5 py-4 backdrop-blur-sm transition-all duration-200 cursor-pointer overflow-hidden ${cfg.glow}`}
                >
                  <span
                    className={`absolute left-0 top-0 bottom-0 w-1 ${cfg.bar} opacity-70 group-hover:opacity-100 transition-opacity`}
                  />
                  <span className="font-mono text-sm text-slate-600 group-hover:text-slate-400 transition-colors w-10 text-right tabular-nums pl-5">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-lg text-slate-100 group-hover:text-white transition-colors">
                      {question.title}
                    </h2>
                    <div className="flex gap-1.5 mt-1.5">
                      {question.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-md font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap font-mono ${cfg.badge}`}
                  >
                    {question.difficulty}
                  </span>
                  <svg
                    className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-1 transition-all duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="text-center text-slate-600 text-sm font-mono mt-12">
          {questions.length} problems loaded · more added regularly
        </p>
      </div>
    </div>
  );
}
