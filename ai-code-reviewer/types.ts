
export type SupportedLanguage = 
  | 'javascript' 
  | 'python' 
  | 'typescript' 
  | 'java' 
  | 'csharp' 
  | 'go' 
  | 'ruby' 
  | 'php'
  | 'html'
  | 'css'
  | 'sql'
  | 'rust'
  | 'kotlin'
  | 'swift';

export interface LanguageOption {
  value: SupportedLanguage;
  label: string;
}

// This is used by Gemini for grounding metadata, if applicable.
export interface WebGrounding {
  uri: string;
  title: string;
}

export interface GroundingChunk {
  web?: WebGrounding;
  // Other grounding types can be added here if needed
}
