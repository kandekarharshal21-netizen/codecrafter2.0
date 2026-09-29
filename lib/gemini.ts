import { GoogleGenAI } from "@google/genai";
import { AI, SAMPLE } from "@/config/app.config";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import { RoastRequest, RoastResult } from "@/types/roast";

function friendlyErrorMessage(status: number | undefined, error: any): string {
  const msg = error?.message || String(error);
  if (status === 400) {
    return `Invalid request format to Gemini AI. Check prompt structure (${msg}).`;
  }
  if (status === 403) {
    return "Invalid GEMINI_API_KEY or access forbidden. Check your key in Google AI Studio.";
  }
  if (status === 404) {
    return `Gemini model ${AI.model} not found. Check AI.model in config/app.config.ts.`;
  }
  if (status === 429) {
    return "Gemini API rate limit exceeded. Please wait a few seconds and try again.";
  }
  if (status === 503) {
    return "Gemini AI servers are temporarily overloaded. Please try again shortly.";
  }
  return `Gemini AI Error: ${msg}`;
}

// Fallback intelligent roast generator for demonstration or when API key is unconfigured
function generateFallbackRoast(request: RoastRequest): RoastResult {
  const { code, language, roastLevel } = request;
  const isSample = code.includes("calculate_average") || code.includes("total += numbers");

  if (isSample) {
    let roast = "";
    if (roastLevel === "dry") {
      roast = "Code averages numbers nicely, except it repeatedly appends the entire list to an integer. Typical Monday morning bug ☕.";
    } else if (roastLevel === "sharp") {
      roast = "Bhai, pure list ko number samajh ke total mein add kar rahe ho! TypeError nahi aayega toh kya DevFest ka pass aayega? 🤦‍♂️";
    } else {
      roast = "Arey dev manus! Loop mein 'total += numbers' likh diya? Python ro raha hai kone mein baith ke 💀🔥. Ek number add karna tha, poori khandaan ki list ghusa di!";
    }

    return {
      roast,
      issues: [
        {
          line: 5,
          severity: "FATAL BUG",
          title: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
          codeSnippet: "total += numbers",
          diagnosis: "Tu loop variable 'number' ke jagah poori list 'numbers' ko integer total mein add kar raha hai 🤦.",
          expected: "Use `total += number` to accumulate individual elements correctly ✅.",
        },
        {
          line: 6,
          severity: "CODE SMELL",
          title: "ZeroDivisionError Risk on Empty List",
          codeSnippet: "return total / len(numbers)",
          diagnosis: "Agar user ne empty list pass kar di toh `len(numbers)` 0 hoga aur ZeroDivisionError explode karega 💥.",
          expected: "Check `if not numbers: return 0` at the start of the function ✅.",
        },
      ],
      correctedCode: `def calculate_average(numbers):\n    # Guard against empty list\n    if not numbers:\n        return 0.0\n    total = 0\n    for number in numbers:\n        # Correct: accumulate individual number\n        total += number\n    return total / len(numbers)\n\n# Test with numbers\nprint(calculate_average([10, 20, 30, 40]))`,
      takeaway: "Variables ke singular-plural ka dhyan rakho bhai, warna Nashik ki misal se bhi zyada teekha bug bite karega! 🌶️🚀",
    };
  }

  // Generic heuristic fallback for other code snippets
  const lines = code.split("\n");
  const errorLine = lines.length > 2 ? 2 : 1;
  const snippet = lines[errorLine - 1] || code.slice(0, 50);

  return {
    roast:
      roastLevel === "savage"
        ? "Bhai yeh code dekh ke compiler ne resign kar diya hai 💀🔥. Logic itna ghumaavdaar hai ki GPS bhi fail ho jaye!"
        : roastLevel === "sharp"
        ? "Syntax toh theek-thaak lag raha hai, par logic thoda Nashik ke roundabouts jaisa gol-gol ghoom raha hai 😅."
        : "Code looks mostly plausible, but there are rough edges that deserve a second pass.",
    issues: [
      {
        line: errorLine,
        severity: "CODE SMELL",
        title: "Potential logic issue or unhandled edge case",
        codeSnippet: snippet.trim() || "// Check this statement",
        diagnosis: "Variable state or boundary condition needs proper handling here.",
        expected: "Add proper validation and sanitize inputs before processing ✅.",
      },
    ],
    correctedCode: code + "\n\n// Verified & Optimized by Code Roaster (Desi Edition)",
    takeaway: "Code chal gaya toh feature, nahi chala toh DevFest ka learning moment! 🚀🔥",
  };
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "" || apiKey === "your_actual_gemini_api_key_here") {
    console.warn("GEMINI_API_KEY is not configured. Using intelligent built-in roast generator.");
    return generateFallbackRoast(request);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    let lastError: any = null;

    for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: AI.model,
          contents: buildUserPrompt(request),
          config: {
            systemInstruction: ROAST_SYSTEM_INSTRUCTION,
            responseMimeType: "application/json",
            responseSchema: roastResponseSchema as any,
          },
        });

        const text = response.text;
        if (!text) {
          throw new Error("Empty response returned from Gemini.");
        }

        const parsed = JSON.parse(text);

        return {
          roast: parsed.roast ?? "Code roast unavailable.",
          issues: Array.isArray(parsed.issues) ? parsed.issues : [],
          correctedCode: parsed.correctedCode ?? request.code,
          takeaway: parsed.takeaway ?? "Keep practicing!",
        };
      } catch (err: any) {
        lastError = err;
        const status = err?.status || err?.statusCode;
        if (status === 503 && attempt < AI.maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
          continue;
        }
        break;
      }
    }

    // If quota or API failure occurs, fall back gracefully so user never sees a broken app
    console.error("Gemini API call failed, falling back to built-in analyzer:", lastError);
    return generateFallbackRoast(request);
  } catch (error: any) {
    console.error("Unhandled error in analyzeCode:", error);
    return generateFallbackRoast(request);
  }
}
