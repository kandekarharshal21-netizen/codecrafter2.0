import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema = {
  type: "OBJECT",
  properties: {
    roast: {
      type: "STRING",
      description: "A funny and spicy Hinglish critique of the code based on the selected roast level.",
    },
    issues: {
      type: "ARRAY",
      description: "List of identified issues in the code.",
      items: {
        type: "OBJECT",
        properties: {
          line: {
            type: "INTEGER",
            description: "1-based line number of the issue.",
          },
          severity: {
            type: "STRING",
            enum: [...SEVERITIES],
            description: "Severity level of the issue.",
          },
          title: {
            type: "STRING",
            description: "Short punchy Hinglish title for the issue.",
          },
          codeSnippet: {
            type: "STRING",
            description: "Exact snippet from the code that has the issue.",
          },
          diagnosis: {
            type: "STRING",
            description: "Explanation of what is wrong in Hinglish.",
          },
          expected: {
            type: "STRING",
            description: "What should be done instead in Hinglish.",
          },
        },
        required: ["line", "severity", "title", "codeSnippet", "diagnosis", "expected"],
      },
    },
    correctedCode: {
      type: "STRING",
      description: "The complete, working, corrected code without markdown code blocks.",
    },
    takeaway: {
      type: "STRING",
      description: "Final concluding tip or witty takeaway in Hinglish.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
