
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-sky-500"></div>
      <p className="ml-3 text-slate-300">Processing your code...</p>
    </div>
  );
};
