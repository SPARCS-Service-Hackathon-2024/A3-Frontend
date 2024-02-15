import { useCallback, useEffect, useState } from "react";

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

const useSpeechToText = () => {
  const [text, setText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  const [recognition] = useState(
    window.SpeechRecognition || window.webkitSpeechRecognition
      ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      : null,
  );

  const onResult = useCallback((event: SpeechRecognitionEvent) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");
    setText(transcript);
  }, []);

  const onEnd = useCallback(() => {
    if (window.navigator.userAgentData?.mobile) {
      recognition?.start();
    }
  }, [recognition]);

  const onError = useCallback((event: SpeechRecognitionErrorEvent) => {
    console.error("Speech recognition error:", event.error);
    setIsListening(false);
  }, []);

  useEffect(() => {
    if (!recognition) return;

    recognition.interimResults = true;
    recognition.lang = "ko-KR";

    const isMobileDevice = window.navigator.userAgentData?.mobile ?? false;
    recognition.continuous = !isMobileDevice;

    recognition.addEventListener("result", onResult);
    recognition.addEventListener("end", onEnd);
    recognition.addEventListener("error", onError);

    return () => {
      recognition.stop();
      recognition.removeEventListener("result", onResult);
      recognition.removeEventListener("end", onEnd);
      recognition.removeEventListener("error", onError);
    };
  }, [text, onEnd, recognition, onResult, onError]);

  const startListening = () => {
    setIsListening(true);
    recognition?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition?.stop();
  };

  const reset = () => {
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
