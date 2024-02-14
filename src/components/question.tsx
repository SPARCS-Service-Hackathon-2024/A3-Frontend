import { useEffect, useState } from "react";
import LineSplit from "./line-split";
import script from "../dummy-script.json";
import { DialogType } from "../dialog";
import { FaMicrophone } from "react-icons/fa6";
import cc from "classcat";
import { AnimatePresence, motion } from "framer-motion";
import userSpeechRecognition from "../pages/userSpeechRecognition";


export default function Question() {
  const [index, setIndex] = useState(0);
  const [dialog, setDialog] = useState<DialogType>(script[0]);
  const [isDialogEnd, setIsDialogEnd] = useState(false);
  const { startListening, stopListening, isListening, hasRecognitionSupport } = userSpeechRecognition();

  useEffect(() => {
    setDialog(script[index % script.length]);
    setIsDialogEnd(false);
  }, [index]);

  const handleSkip = () => {
    if (isDialogEnd && !dialog.isQuestion && index < script.length - 1) {
      setIndex(index + 1);
    }
  };

  function setText(value: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div
      className={cc([
        "flex h-full flex-col items-center justify-between overflow-hidden transition-all duration-500",
        dialog.isQuestion && isDialogEnd ? "pt-8" : "pt-24",
      ])}
      onClick={handleSkip}
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
            initial={{ opacity: 0, y: 64 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, y: 64, transition: { duration: 0.2 } }}
            className="flex h-full w-full flex-col items-center justify-end gap-4 px-12 pb-12"
          >
            {/* <button className="btn btn-primary btn-lg btn-circle h-32 w-32 shrink-0 text-5xl">
              <FaMicrophone />
            </button> */}
            <>
              {hasRecognitionSupport && (
                <button
                  onClick={isListening ? stopListening : startListening}
                  className="btn btn-primary btn-lg font-sans-serif w-full flex items-center justify-center gap-2"
                >
                  {isListening ? (
                    <>
                      <img src="bars.svg" alt="" style={{ width: '1em', height: '1em' }} />
                      듣고 있습니다
                    </>
                  ) : (
                    <>
                      <FaMicrophone style={{ fontSize: '1.5rem' }} />
                      음성 기록
                    </>
                  )}
                </button>
              )}

              {/* Text Area to display and edit the transcribed text */}
              <textarea
                className="mt-4 w-full p-2 border rounded"
                value={text}
                onChange={(e) => setText(e.target.value)} // Allows editing the text
                placeholder="Transcribed text will appear here..."
                rows={5} // Adjust the number of rows as needed
                disabled={!hasRecognitionSupport} // Optionally disable if recognition is not supported
              ></textarea>
            </>

            <button className="btn btn-primary btn-lg font-sans-serif w-full">
              직접 입력하기
            </button>
            <button className="btn btn-primary btn-outline btn-lg font-sans-serif w-full">
              이 질문 건너뛰기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
