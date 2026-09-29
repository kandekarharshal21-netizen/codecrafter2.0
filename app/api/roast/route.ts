import { NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { LanguageId, RoastLevel, RoastRequest } from "@/types/roast";

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body provided." },
      { status: 400 }
    );
  }

  const code = typeof body.code === "string" ? body.code : "";
  const errorMessage =
    typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

  // Validation
  if (!code || code.trim() === "") {
    return NextResponse.json(
      { error: "No code provided. I can't roast the void." },
      { status: 400 }
    );
  }

  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  if (errorMessage && errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // Fallback defaults for language and roastLevel
  const validLanguageIds = LANGUAGES.map((l) => l.id) as string[];
  const validRoastLevels = ROAST_LEVELS.map((r) => r.id) as string[];

  const language: LanguageId = validLanguageIds.includes(body.language)
    ? body.language
    : DEFAULTS.language;

  const roastLevel: RoastLevel = validRoastLevels.includes(body.roastLevel)
    ? body.roastLevel
    : DEFAULTS.roastLevel;

  const roastRequest: RoastRequest = {
    language,
    code,
    roastLevel,
    errorMessage: errorMessage || undefined,
  };

  try {
    const result = await analyzeCode(roastRequest);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("API /api/roast error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to analyze and roast code." },
      { status: 500 }
    );
  }
}
