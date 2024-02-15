import { useCallback, useEffect, useState } from "react";
import LineSplit from "./line-split";
import { FaMicrophone } from "react-icons/fa6";
import cc from "classcat";
import { AnimatePresence, motion } from "framer-motion";
import userSpeechRecognition from "../hooks/speechRecog";
import { QuestionType } from "../types/question";
import { useUser } from "../store/useUser";
import { getQuestion, skipQuestion, submitAnswer } from "../apis/question";

export default function Question() {
  const { user, setUser, updateNextQuestionId } = useUser();
  const [index, setIndex] = useState(user.last_answered_question_id || 1);
  const [dialog, setDialog] = useState<QuestionType>();
  const [isDialogEnd, setIsDialogEnd] = useState(false);
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = userSpeechRecognition();
  const [hasRecordedOnce, setHasRecordedOnce] = useState(false); //to track if recording has been made
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchQuestion = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const data = await getQuestion({
      questionId: index,
      token: user.access_token,
    });
    setDialog(data);
    setLoading(false);
  }, [index, user]);

  useEffect(() => {
    fetchQuestion();
    setIsDialogEnd(false);
  }, [fetchQuestion]);

  const skip = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const next = await skipQuestion({
      questionId: index,
      token: user.access_token,
    });
    setIndex(next.question_id);
    updateNextQuestionId(next.question_id);
    setLoading(false);
  }, [index, user, setUser]);

  const submit = async () => {
    if (!user) return;
    setLoading(true);
    const next = await submitAnswer({
      questionId: index,
      answer,
      token: user.access_token,
    });
    setLoading(false);
    setAnswer("");
    setIndex(next.question_id);
    updateNextQuestionId(next.question_id);
  };

  const handleStartRecording = () => {
    startListening();
    setHasRecordedOnce(false);
  };

  const handleStopRecording = () => {
    stopListening();
    setHasRecordedOnce(true);
    console.log(answer);
  };

  useEffect(() => {
    if (text) {
      setAnswer(text);
    }
  }, [text]);

  return (
    <div
      className={cc([
        "flex h-full w-full flex-col items-center overflow-hidden transition-all duration-500",
        dialog?.is_answerable && isDialogEnd && !loading ? "pt-0" : "pt-24",
      ])}
      onClick={() => {
        if (loading) return;
        if (!dialog?.is_answerable && isDialogEnd) {
          skip();
        }
      }}
    >
      <img
        src={
          isListening || (dialog?.is_answerable && loading)
            ? "/bomi/write.gif"
            : "/bomi/default.gif"
        }
        className="h-[250px]"
      />
      {dialog && (
        <>
          <div className="px-8 pt-8 text-center">
            {dialog?.is_answerable && loading && (
              <div className="text-center">말씀하신 내용을 적고 있어요.</div>
            )}
            <LineSplit
              text={dialog.content}
              hasNext={!dialog.is_answerable}
              endDialog={() => setIsDialogEnd(true)}
              hidden={dialog?.is_answerable && loading}
              muted={isListening}
            />
          </div>
          <AnimatePresence>
            {dialog.is_answerable && isDialogEnd && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                className="flex h-full w-full shrink-0 flex-col items-center gap-2 px-12 pb-12"
              >
                <>
                  {hasRecognitionSupport && (
                    <button
                      onClick={
                        isListening ? handleStopRecording : handleStartRecording
                      }
                      disabled={loading}
                      className="font-sans-serif btn btn-circle btn-primary btn-lg relative mb-4 mt-8 h-32 w-32 text-5xl"
                    >
                      {isListening && (
                        <div className="animate-recording absolute inset-0 rounded-full bg-primary/10" />
                      )}
                      {isListening ? (
                        <div className="loading loading-bars" />
                      ) : (
                        <FaMicrophone />
                      )}
                    </button>
                  )}
                  {hasRecordedOnce && (
                    <>
                      <button
                        className="font-sans-serif btn btn-primary w-full text-lg"
                        onClick={submit}
                      >
                        확인
                      </button>
                      <button
                        className="font-sans-serif btn btn-outline btn-secondary w-full text-lg"
                        onClick={handleStartRecording}
                      >
                        다시 기록하기
                      </button>
                    </>
                  )}
                </>
                {!isListening && (
                  <button
                    className="font-sans-serif btn btn-outline btn-primary w-full text-lg"
                    onClick={() => skip()}
                  >
                    이 질문 건너뛰기
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
