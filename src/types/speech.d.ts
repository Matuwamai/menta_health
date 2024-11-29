// Declare the SpeechRecognition interface globally to avoid TypeScript errors
declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionConstructor | undefined;
    webkitSpeechRecognition: SpeechRecognitionConstructor | undefined;
  }
}

// Declare the SpeechRecognition constructor signature
interface SpeechRecognitionConstructor {
  new (): SpeechRecognition; // Allow the SpeechRecognition to be constructed
}

// Define the SpeechRecognition interface
interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  onerror?: (event: Event) => void; // Optional error handler
}

// Define other necessary types for events and results
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList extends Array<SpeechRecognitionResult> {}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

export {}; // Ensure this file is treated as a module
