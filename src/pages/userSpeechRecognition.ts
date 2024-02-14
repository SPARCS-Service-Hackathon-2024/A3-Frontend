import { useEffect, useState } from "react";

let recognition: any = null;

if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.lang = "ko-KR";
    recognition.continuous = true;


}

const userSpeechRecognition = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);


    useEffect( ()  => {
        if(!recognition) return;
        recognition.onresult = (event: any) => {
            console.log("onresult", event);
            setText(event.results[0][0].transcript);
            recognition.stop();
            setIsListening(false);
        }
    })

    const  startListening = () => {
        setText('')
        setIsListening(true);
        recognition.start();
    }

    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    return {
        text,
        startListening,
        stopListening,
        isListening,
        hasRecognitionSupport: !!recognition
    }
}

export default userSpeechRecognition;