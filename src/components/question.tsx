import { useEffect, useState } from "react";
import LineSplit from "./line-split";
import script from "../dummy-script.json";
import { DialogType } from "../dialog";
import { FaMicrophone } from "react-icons/fa6";
import cc from "classcat";
import { AnimatePresence, motion } from "framer-motion";
import userSpeechRecognition from "../hooks/speechRecog";
import InputModal from "./input-modal";

export default function Question() {
  const [index, setIndex] = useState(0);
  const [dialog, setDialog] = useState<DialogType>(script[0]);
  const [isDialogEnd, setIsDialogEnd] = useState(false);
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = userSpeechRecognition();
  const [isTextInputModalOpened, setIsTextInputModalOpened] = useState(false);
  const [hasRecordedOnce, setHasRecordedOnce] = useState(false); //to track if recording has been made
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setDialog(script[index % script.length]);
    setIsDialogEnd(false);
  }, [index]);

  const goToNextDialog = () => {
    if (isDialogEnd && !dialog.isQuestion && index < script.length - 1) {
      setIndex(index + 1);
    }
  };

  const skipQuestion = () => {
    setIndex(index + 1);
  };

  const submitAnswer = () => {
    // TODO: submit answer
    setAnswer("");
    setIndex(index + 1);
  };

  const handleRecordingDone = () => {
    setHasRecordedOnce(true); // Update the state to show the buttons
  };

  const handleRecordAgain = () => {
    // Implement the logic to start recording again
    startListening();
    setHasRecordedOnce(false); // Optional: Hide buttons until recording is done again
  };

  useEffect(() => {
    if (text) {
      setAnswer(text);
      handleRecordingDone();
    }
  }, [text]);

  return (
    <div
      className={cc([
        "flex h-full flex-col items-center justify-between overflow-hidden transition-all duration-500",
        dialog.isQuestion && isDialogEnd ? "pt-0" : "pt-24",
      ])}
      onClick={goToNextDialog}
    >
      <img
        src={isListening ? "/bomi/write.gif" : "/bomi/default.gif"}
        className="h-[300px]"
      />
      <div className="h-full break-keep px-8 pt-8 text-center">
        <LineSplit
          text={dialog.text}
          hasNext={dialog.isQuestion === false && index < script.length - 1}
          endDialog={() => setIsDialogEnd(true)}
        />
      </div>
      <AnimatePresence>
        {dialog.isQuestion && isDialogEnd && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
            className="flex h-full w-full flex-col items-center justify-end gap-4 px-12 pb-8"
          >
            <>
              {hasRecognitionSupport && (
                <>
                  <button
                    onClick={
                      isListening
                        ? () => {
                            stopListening();
                            setIsTextInputModalOpened(true);
                          }
                        : () => startListening()
                    }
                    className="btn btn-primary btn-lg font-sans-serif btn-circle relative h-32 w-32 text-5xl"
                  >
                    {isListening && (
                      <div className="bg-primary/10 animate-recording absolute inset-0 rounded-full" />
                    )}
                    {isListening ? (
                      <div className="loading loading-bars" />
                    ) : (
                      <FaMicrophone />
                    )}
                  </button>
                </>
              )}
            </>
            {hasRecordedOnce && ( // Conditionally render the new buttons
              <>
                <button
                  className="btn btn-success btn-lg font-sans-serif mb-8 w-full"
                  onClick={goToNextDialog}
                >
                  기록 되었습니다. 넘어갈까요?
                </button>
                <button
                  className="btn btn-secondary btn-outline btn-lg font-sans-serif mb-8 w-full"
                  onClick={handleRecordAgain}
                >
                  다시 기록하기
                </button>
              </>
            )}
            {/* <button
              className="btn btn-primary btn-lg font-sans-serif w-full"
              onClick={() => setIsTextInputModalOpened(true)}
            >
              직접 입력하기
            </button> */}
            <button
              className="btn btn-primary btn-outline btn-lg font-sans-serif w-full"
              onClick={() => skipQuestion()}
            >
              이 질문 건너뛰기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <InputModal
        questionText={dialog.text}
        isOpened={isTextInputModalOpened}
        close={() => {
          setIsTextInputModalOpened(false);
        }}
        submit={() => submitAnswer()}
        answer={answer}
        setAnswer={setAnswer}
      /> */}
    </div>
  );
}
