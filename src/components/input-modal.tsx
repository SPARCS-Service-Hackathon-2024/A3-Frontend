import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

export default function InputModal({
  questionText,
  isOpened,
  close,
  submit,
  answer,
  setAnswer,
}: {
  questionText: string;
  isOpened: boolean;
  close: () => void;
  submit: () => void;
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
}) {
  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
        >
          <motion.div
            initial={{ y: 64 }}
            animate={{ y: 0, transition: { duration: 0.5 } }}
            exit={{ y: 64, transition: { duration: 0.2 } }}
            className="flex w-full max-w-96 flex-col rounded-lg bg-base-100 p-8 shadow-xl"
          >
            <div className="text-center text-lg font-bold">{questionText}</div>
            <textarea
              className="textarea textarea-bordered textarea-lg my-8 min-h-64 w-full resize-none"
              autoFocus
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button
              className="btn btn-primary btn-lg w-full"
              onClick={() => {
                submit();
                close();
              }}
            >
              입력 완료
            </button>
            <button
              className="btn btn-outline btn-primary btn-lg mt-4 w-full"
              onClick={close}
            >
              취소
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
