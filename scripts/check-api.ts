import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`Checking API connectivity with model: ${AI.model}...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language as any,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage:
        "TypeError: unsupported operand type(s) for +=: 'int' and 'list' at line 6",
    });

    console.log("-----------------------------------------");
    console.log("✅ Analysis successful!");
    console.log(`Roast: ${result.roast}`);
    console.log(`Issues detected: ${result.issues.length}`);
    console.log("Takeaway:", result.takeaway);
    console.log("-----------------------------------------");
    process.exit(0);
  } catch (error) {
    console.error("❌ API check failed:", error);
    process.exit(1);
  }
}

main();
