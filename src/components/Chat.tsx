import  { useState, useRef, useEffect } from "react";
import { fetchAIResponse } from "../services/apiService";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const SpeechRecognitionConstructor =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognitionConstructor) {
    console.error("Speech Recognition is not supported in this browser.");
    return null;
  }

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  if (!recognitionRef.current) {
    recognitionRef.current = new SpeechRecognitionConstructor();
    recognitionRef.current.lang = "en-US","sw";
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
  }

  const handleMicClick = () => {
    setIsListening(true);
    recognitionRef.current?.start();
  };

  const handleRecognitionResult = async (event: any) => {
    const transcript = event.results[0][0].transcript;
    setMessages((prevMessages) => [...prevMessages, { user: "user", text: transcript }]);
    setIsListening(false);

    setIsTyping(true);
    const aiResponse = await fetchAIResponse(transcript);
    handleAIResponse(aiResponse);
  };

  const handleRecognitionEnd = () => {
    setIsListening(false);
  };

  const handleRecognitionError = (event: Event) => {
    console.error("Speech Recognition Error", event);
    setIsListening(false);
  };

  const handleAIResponse = (aiResponse: string) => {
    setIsTyping(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: "ai", text: aiResponse },
    ]);

    const utterance = new SpeechSynthesisUtterance(aiResponse);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const recognition = recognitionRef.current;
    if (recognition) {
      recognition.onresult = handleRecognitionResult;
      recognition.onend = handleRecognitionEnd;
      recognition.onerror = handleRecognitionError;

      return () => {
        recognition.onresult = () => {};
        recognition.onend = () => {};
        recognition.onerror = () => {};
      };
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-100 to-indigo-200 shadow-lg rounded-lg max-w-md mx-auto p-4">
      <header className="bg-indigo-500 text-white p-4 rounded-t-lg text-center shadow-md">
        <h1 className="text-xl font-semibold tracking-wide">Mental Health AI assistant</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.user === "user" ? "text-right" : "text-left"
            } animate-fade-in`}
          >
            <div
              className={`inline-block p-4 rounded-lg shadow-md transition duration-300 ease-in-out ${
                message.user === "user"
                  ? "bg-blue-500 text-white max-w-xs rounded-br-none"
                  : "bg-white text-gray-800 max-w-xs rounded-bl-none"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-center text-gray-500 animate-pulse">AI is responding soon...</div>
        )}
      </div>

      <div className="p-4 border-t border-gray-300 flex justify-center">
        <button
          onClick={handleMicClick}
          className={`p-4 rounded-full text-white transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none ${
            isListening
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isListening ? (
            <span className="animate-pulse">i'm Listening...</span>
          ) : (
            "🎤"
          )}
        </button>
      </div>
    </div>
  );
};

export default Chat;
