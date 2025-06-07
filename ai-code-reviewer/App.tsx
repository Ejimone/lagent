import React, { useState, useCallback } from "react";
import { CodeInput } from "./components/CodeInput";
import { ReviewOutput } from "./components/ReviewOutput";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { getReviewFeedback } from "./services/geminiService";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "./constants";
import type { SupportedLanguage } from "./types";

const App: React.FC = () => {
  const [codeToReview, setCodeToReview] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>(DEFAULT_LANGUAGE);
  const [reviewFeedback, setReviewFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmitReview = useCallback(async () => {
    if (!codeToReview.trim()) {
      setError("Please enter some code to review.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setReviewFeedback(null);

    try {
      const feedback = await getReviewFeedback(codeToReview, selectedLanguage);
      setReviewFeedback(feedback);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during the review process.");
      }
      console.error("Review Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [codeToReview, selectedLanguage]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-sky-400">
          OpenCode Code Reviewer
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
          Get instant feedback on your code using OpenCode Code Reviewer.
        </p>
      </header>

      <main className="w-full max-w-4xl space-y-6">
        <CodeInput
          code={codeToReview}
          onCodeChange={setCodeToReview}
          language={selectedLanguage}
          onLanguageChange={(langVal) =>
            setSelectedLanguage(langVal as SupportedLanguage)
          }
          onSubmit={handleSubmitReview}
          supportedLanguages={SUPPORTED_LANGUAGES}
          isLoading={isLoading}
        />

        {isLoading && <LoadingSpinner />}
        {error && <ErrorDisplay message={error} />}

        {reviewFeedback && !isLoading && !error && (
          <ReviewOutput feedback={reviewFeedback} />
        )}
      </main>

      <footer className="mt-12 text-center text-slate-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} OpenCode Code Reviewer. Built with
          ❤️ by OpenCode.
        </p>
      </footer>
    </div>
  );
};

export default App;
