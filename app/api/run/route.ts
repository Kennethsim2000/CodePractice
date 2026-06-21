import { NextRequest, NextResponse } from "next/server";

// Public, free Judge0 CE instance — no API key required.
// Shared/rate-limited; fine for personal practice, not for production traffic.
const JUDGE0_BASE = "https://ce.judge0.com";
const CPP_LANGUAGE_ID = 54; // C++ (GCC 9.2.0)

interface RunRequestBody {
  code: string;
  stdin?: string;
}

export async function POST(req: NextRequest) {
  const { code, stdin = "" }: RunRequestBody = await req.json();

  if (!code || !code.trim()) {
    return NextResponse.json({ error: "No code submitted." }, { status: 400 });
  }

  try {
    const submitRes = await fetch(
      `${JUDGE0_BASE}/submissions?base64_encoded=true&wait=true`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          language_id: CPP_LANGUAGE_ID,
          source_code: Buffer.from(code).toString("base64"),
          stdin: Buffer.from(stdin).toString("base64"),
        }),
      },
    );

    if (!submitRes.ok) {
      const text = await submitRes.text();
      return NextResponse.json(
        { error: `Judge0 request failed (${submitRes.status}): ${text}` },
        { status: 502 },
      );
    }

    const result = await submitRes.json();

    const decode = (val: string | null) =>
      val ? Buffer.from(val, "base64").toString("utf-8") : "";

    return NextResponse.json({
      stdout: decode(result.stdout),
      stderr: decode(result.stderr),
      compileOutput: decode(result.compile_output),
      status: result.status?.description ?? "Unknown",
      time: result.time,
      memory: result.memory,
    });
  } catch (err) {
    return NextResponse.json(
      { error: `Unexpected error contacting Judge0: ${String(err)}` },
      { status: 500 },
    );
  }
}
