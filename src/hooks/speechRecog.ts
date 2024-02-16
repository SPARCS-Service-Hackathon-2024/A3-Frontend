import { useEffect, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: unknown;
  }
  interface Navigator {
    userAgentData?: {
      mobile: boolean;
    };
  }
}

let recognition: SpeechRecognition | null = null;

if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  const SpeechRecognition =
    //@ts-expect-error no need to check for window.SpeechRecognition
    window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = "ko-KR"; // Adjust the language as needed
  // recognition.continuous = true;

  // Detect if the app is loaded on a mobile device
  const isMobileDevice = window.navigator.userAgentData?.mobile ?? false;

  // Set the continuous flag based on the device type
  recognition.continuous = !isMobileDevice;
}

const useSpeechToText = () => {
  const [text, setText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  useEffect(() => {
    if (!recognition) return;

    let lastDebounceTranscript = "";
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      if (event.results[0].isFinal) setText(transcript);
      else if (
        lastDebounceTranscript !== transcript &&
        transcript.length > lastDebounceTranscript.length
      ) {
        lastDebounceTranscript = transcript;
        setText(lastDebounceTranscript);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    setText("");
    setIsListening(true);
    recognition?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition?.stop();
  };

  return {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechToText;
