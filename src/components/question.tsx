import { useEffect, useState } from "react";
import LineSplit from "./line-split";
import script from "../dummy-script.json";
import { DialogType } from "../dialog";
import { FaMicrophone } from "react-icons/fa6";
import cc from "classcat";
import { AnimatePresence, motion } from "framer-motion";
import userSpeechRecognition from "../pages/speechRecog";
import InputModal from "./input-modal";

export default function Question() {
  const [index, setIndex] = useState(0);
  const [dialog, setDialog] = useState<DialogType>(script[0]);
  const [isDialogEnd, setIsDialogEnd] = useState(false);
  const {text, startListening, stopListening, isListening, hasRecognitionSupport } = userSpeechRecognition();
  const [isTextInputModalOpened, setIsTextInputModalOpened] = useState(false);
  const [answer, setAnswer] = useState(text);
  
  useEffect(() => {
    setDialog(script[index % script.length]);
    setIsDialogEnd(false);
  }, [index]);

  useEffect(() => {
    setAnswer(text);
  }, [text]);

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


  return (
    <div
      className={cc([
        "flex h-full flex-col items-center justify-between overflow-hidden transition-all duration-500",
        dialog.isQuestion && isDialogEnd ? "pt-0" : "pt-24",
      ])}
      onClick={goToNextDialog}
    >
      <img src="/laura/default.gif" className="h-[300px]" />
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
                  onClick={isListening ? stopListening : startListening}
                  className="btn mt-6 rounded-lg btn-primary btn-lg font-sans-serif w-full flex items-center justify-center gap-2"
                >
                  {isListening ? (
                    <>
                      <img src="src/components/icons/bars.svg" alt="" style={{ width: '2em', height: '2em' }} />
                      음성 녹음 중
                    </>
                  ) : (
                    <>
                      <FaMicrophone style={{ fontSize: '1.5rem' }} />
                      음성 기록
                    </>
                  )}
                </button>
              </>
            )}

            <p className="mt-2 mb-2 w-full p-2 border-4 rounded-lg"
              style={{
                minHeight: '200px'
              }}> 
            
              {answer}
            </p>

            </>
            <button
              className="btn rounded-lg btn-primary btn-lg font-sans-serif w-full"
              onClick={() => setIsTextInputModalOpened(true)}
            >
              수정하기
            </button>
            <button
              className="btn rounded-lg btn-primary btn-outline btn-lg font-sans-serif w-full"
              onClick={() => skipQuestion()}
            >
              이 질문 건너뛰기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <InputModal
        questionText={dialog.text}
        isOpened={isTextInputModalOpened}
        close={() => {
          setIsTextInputModalOpened(false);
        }}
        submit={() => submitAnswer()}
        answer={answer}
        setAnswer={setAnswer}
      />
    </div>
  );
}
