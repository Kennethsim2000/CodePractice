"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { getProblem } from "../../../lib/problems";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const difficultyConfig: Record<
  string,
  { text: string; bar: string; badge: string }
> = {
  Easy: {
    text: "text-emerald-300",
    bar: "bg-emerald-400",
    badge:
      "bg-emerald-400/10 text-emerald-300 ring-1 ring-inset ring-emerald-400/30",
  },
  Medium: {
    text: "text-amber-300",
    bar: "bg-amber-400",
    badge: "bg-amber-400/10 text-amber-300 ring-1 ring-inset ring-amber-400/30",
  },
  Hard: {
    text: "text-rose-300",
    bar: "bg-rose-400",
    badge: "bg-rose-400/10 text-rose-300 ring-1 ring-inset ring-rose-400/30",
  },
};

export default function ProblemPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = Number(params.id);
  const problem = getProblem(id);

  const [code, setCode] = useState(problem?.starterCode ?? "");
  const [output, setOutput] = useState<string | null>(null);
  const [running, setRunning] = useState(false);

  async function runCode() {
    setRunning(true);
    setOutput(null);
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      const text =
        data.stdout || data.stderr || data.compileOutput || data.error || "";
      setOutput(`[${data.status ?? "Error"}]\n${text}`);
    } catch (err) {
      setOutput(`[Network Error]\n${String(err)}`);
    } finally {
      setRunning(false);
    }
  }

  if (!problem) {
    return (
      <div className="min-h-screen bg-[#0B0B1A] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-slate-500 mb-4">
            404 — problem not found
          </p>
          <Link
            href="/"
            className="text-violet-300 hover:text-violet-200 font-mono text-sm"
          >
            ← back to problems
          </Link>
        </div>
      </div>
    );
  }

  const cfg = difficultyConfig[problem.difficulty];

  return (
    <div className="h-screen bg-[#0B0B1A] text-white relative overflow-hidden flex flex-col">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[26rem] w-[26rem] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[20rem] w-[20rem] rounded-full bg-cyan-500/15 blur-[120px]" />
      </div>

      {/* Top bar */}
      <header className="relative z-10 flex items-center gap-4 px-6 py-4 border-b border-white/10 bg-white/[0.02] backdrop-blur-sm shrink-0">
        <button
          onClick={() => router.push("/")}
          className="font-mono text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          problems
        </button>

        <div className={`h-1.5 w-1.5 rounded-full ${cfg.bar}`} />
        <h1 className="font-mono font-semibold text-sm text-slate-100">
          {problem.title}
        </h1>
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono ${cfg.badge}`}
        >
          {problem.difficulty}
        </span>

        <button
          onClick={runCode}
          disabled={running}
          className="ml-auto flex items-center gap-2 px-4 py-1.5 rounded-lg bg-violet-500 hover:bg-violet-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold font-mono transition-colors shadow-[0_0_20px_-4px_rgba(124,58,237,0.6)]"
        >
          {running ? (
            <>
              <svg
                className="w-3.5 h-3.5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Running…
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Run
            </>
          )}
        </button>
      </header>

      {/* Split pane */}
      <div className="relative z-10 flex-1 flex min-h-0">
        {/* Left: description */}
        <div className="w-[40%] min-w-[320px] overflow-y-auto border-r border-white/10 bg-white/[0.015]">
          <div className="p-6">
            <div className="flex gap-1.5 mb-5">
              {problem.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-md font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose-invert font-sans text-[15px] leading-relaxed text-slate-300 whitespace-pre-wrap">
              {problem.description}
            </div>
          </div>
        </div>

        {/* Right: editor + output */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/[0.02] shrink-0">
            <span className="font-mono text-xs text-slate-500">
              solution.cpp
            </span>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.bar} ml-1`} />
          </div>

          <div className="flex-1 min-h-0">
            <Editor
              height="100%"
              defaultLanguage="cpp"
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value ?? "")}
              options={{
                fontSize: 14,
                fontFamily: "var(--font-geist-mono), monospace",
                minimap: { enabled: false },
                padding: { top: 16 },
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          {/* Output panel */}
          {output !== null && (
            <div className="shrink-0 border-t border-white/10 bg-black/40 backdrop-blur-sm">
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
                <span className="font-mono text-xs text-slate-500">output</span>
                <button
                  onClick={() => setOutput(null)}
                  className="font-mono text-xs text-slate-600 hover:text-slate-400 transition-colors"
                >
                  clear
                </button>
              </div>
              <pre className="font-mono text-xs text-slate-300 p-4 max-h-48 overflow-y-auto leading-relaxed">
                {output}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
