import type { LanguageOption, SupportedLanguage } from "./types";

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "typescript", label: "TypeScript" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "sql", label: "SQL" },
  { value: "rust", label: "Rust" },
  { value: "kotlin", label: "Kotlin" },
  { value: "swift", label: "Swift" },
];

export const DEFAULT_LANGUAGE: SupportedLanguage = "javascript";

export const GEMINI_MODEL_NAME = "gemini-2.5-flash-preview-04-17";

export const CODE_REVIEW_PROMPT_TEMPLATE = `
You are an expert AI code reviewer. Your task is to meticulously analyze the provided code and offer constructive, actionable feedback.

**Instructions for Review:**
1.  Identify Language: Confirm the language of the code ({LANGUAGE}).
2.  Bugs & Logical Errors: Pinpoint any potential bugs, logical flaws, or runtime errors. Explain why they are problematic.
3.  Best Practices & Conventions: Evaluate adherence to established {LANGUAGE} best practices, idiomatic expressions, and common coding conventions (e.g., naming, formatting).
4.  Readability & Maintainability: Suggest improvements for code clarity, structure, modularity, and ease of understanding. Comment on complex sections that could be simplified.
5.  Performance: Identify potential performance bottlenecks or inefficient code patterns. Suggest specific optimizations if applicable, explaining the trade-offs.
6.  Security: Highlight any security vulnerabilities (e.g., XSS, SQL injection, insecure handling of secrets) and recommend mitigations.
7.  Code Smells: Point out any code smells (e.g., duplicated code, long methods, large classes) and suggest refactoring strategies.
8.  Suggestions for Improvement: Provide specific, actionable recommendations for refactoring or enhancing the code. Where appropriate, offer brief corrected code snippets.
9.  Clarity and Tone: Deliver feedback in a clear, concise, and professional manner. Aim to be helpful and educational.

Output Format:
Please structure your review using Markdown. Use headings, bullet points, and code blocks (for both problematic code and suggested fixes) to enhance readability.

**Language:** {LANGUAGE}

**Code to Review:**
\`\`\`{LANGUAGE}
{CODE_CONTENT}
\`\`\`

Begin your review now:
`;
