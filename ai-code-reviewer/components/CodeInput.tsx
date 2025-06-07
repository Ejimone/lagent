
import React from 'react';
import type { LanguageOption, SupportedLanguage } from '../types';

interface CodeInputProps {
  code: string;
  onCodeChange: (value: string) => void;
  language: SupportedLanguage;
  onLanguageChange: (value: string) => void;
  onSubmit: () => void;
  supportedLanguages: LanguageOption[];
  isLoading: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  code,
  onCodeChange,
  language,
  onLanguageChange,
  onSubmit,
  supportedLanguages,
  isLoading,
}) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div className="sm:col-span-2">
          <label htmlFor="language-select" className="block text-sm font-medium text-slate-300 mb-1">
            Select Language
          </label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full p-3 bg-slate-700 text-slate-50 border border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 transition duration-150"
            disabled={isLoading}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={onSubmit}
          disabled={isLoading || !code.trim()}
          className="w-full bg-sky-600 hover:bg-sky-700 disabled:bg-slate-500 text-white font-semibold py-3 px-4 rounded-md shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 h-12"
        >
          {isLoading ? 'Reviewing...' : 'Review Code'}
        </button>
      </div>
      <div>
        <label htmlFor="code-input" className="block text-sm font-medium text-slate-300 mb-1">
          Paste Your Code Here
        </label>
        <textarea
          id="code-input"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder={`Enter ${language} code here...`}
          rows={15}
          className="w-full p-3 bg-slate-700 text-slate-50 border border-slate-600 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 transition duration-150 font-mono text-sm"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};
