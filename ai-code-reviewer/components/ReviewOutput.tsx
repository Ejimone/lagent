
import React from 'react';

interface ReviewOutputProps {
  feedback: string | null;
}

export const ReviewOutput: React.FC<ReviewOutputProps> = ({ feedback }) => {
  if (!feedback) {
    return null;
  }

  // Basic Markdown-like rendering for code blocks
  // A more sophisticated library could be used for full Markdown support
  const renderFeedback = (text: string) => {
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeBlockLang = '';

    return lines.map((line, index) => {
      if (line.startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        if (inCodeBlock) {
          codeBlockLang = line.substring(3).trim();
        }
        return null; // Don't render the fence itself, or render a styled div
      }
      if (inCodeBlock) {
        return (
          <pre key={index} className="bg-slate-950 p-3 rounded-md overflow-x-auto my-2 text-sm">
            <code className={codeBlockLang ? `language-${codeBlockLang}` : ''}>{line}</code>
          </pre>
        );
      }
      // Simple bold and italic
      line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      if (line.startsWith('# ')) return <h1 key={index} className="text-2xl font-bold mt-4 mb-2" dangerouslySetInnerHTML={{ __html: line.substring(2) }} />;
      if (line.startsWith('## ')) return <h2 key={index} className="text-xl font-semibold mt-3 mb-1" dangerouslySetInnerHTML={{ __html: line.substring(3) }} />;
      if (line.startsWith('### ')) return <h3 key={index} className="text-lg font-semibold mt-2 mb-1" dangerouslySetInnerHTML={{ __html: line.substring(4) }} />;
      if (line.match(/^-\s|^(\*)\s/)) return <li key={index} className="ml-5 list-disc" dangerouslySetInnerHTML={{ __html: line.substring(2) }} />;
      
      return <p key={index} className="my-1" dangerouslySetInnerHTML={{ __html: line }} />;
    });
  };


  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl mt-6">
      <h2 className="text-2xl font-semibold text-sky-400 mb-4">
        Review Feedback
      </h2>
      <div className="prose prose-invert max-w-none text-slate-200 whitespace-pre-wrap leading-relaxed">
        {renderFeedback(feedback)}
      </div>
    </div>
  );
};
