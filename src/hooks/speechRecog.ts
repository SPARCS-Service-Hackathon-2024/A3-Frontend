import { useEffect, useState } from "react";

declare global {
  interface Window {
    //eslint-disable-next-line
    webkitSpeechRecognition: any;
    //eslint-disable-next-line
    SpeechRecognition: any;
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

let prev = "",
  now = "";

const useSpeechToText = () => {
  const [text, setText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      now = transcript;
    };

    recognition.onend = () => {
      prev = prev + now;
      setText(prev);
      if (window.navigator.userAgentData?.mobile ?? false) {
        recognition.start();
      } else {
        setIsListening(false);
      }
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
    setIsListening(true);
    recognition?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition?.stop();
  };

  const reset = () => {
    prev = "";
    now = "";
    setText("");
  };

  return {
    text,
    reset,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport: !!recognition,
  };
};

export default useSpeechToText;
