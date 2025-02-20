import { useCallback, useEffect, useState } from "react";
import LineSplit from "./line-split";
import { FaMicrophone } from "react-icons/fa6";
import cc from "classcat";
import { AnimatePresence, motion } from "framer-motion";
import useSpeechRecognition from "../hooks/speechRecog";
import { QuestionType } from "../types/question";
import { useUser } from "../store/useUser";
import { getQuestion, skipQuestion, submitAnswer } from "../apis/question";
import { useNavigate } from "react-router";

export default function Question() {
  const { user, updateNextQuestionId, updatePrevQuestionID } = useUser();
  const [index, setIndex] = useState(user.last_answered_question_id || 1);
  const [dialog, setDialog] = useState<QuestionType>();
  const [isDialogEnd, setIsDialogEnd] = useState(false);
  const {
    text,
    startListening,
    stopListening,
    isListening,
    hasRecognitionSupport,
  } = useSpeechRecognition();
  const [answer, setAnswer] = useState("");
  const [prevAnswer, setPrevAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [isDialogLoading, setIsDialogLoading] = useState(false);
  const [isSkipLoading, setIsSkipLoading] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  useEffect(() => {
    setLoading(isDialogLoading || isSkipLoading || isSubmitLoading);
  }, [isDialogLoading, isSkipLoading, isSubmitLoading]);

  const fetchQuestion = useCallback(async () => {
    if (!user) return;
    setIsDialogLoading(true);
    const data = await getQuestion({
      questionId: index,
      token: user.access_token,
    });
    setDialog(data);
    setPrevAnswer(""); // Clear previous answers when a new question is loaded
    setTimeout(() => setIsDialogLoading(false), 300);
  }, [index, user]);

  useEffect(() => {
    fetchQuestion();
    setIsDialogEnd(false);
  }, [index]);

  const skip = useCallback(async () => {
    if (!user) return;
    setIsSkipLoading(true);
    const next = await skipQuestion({
      questionId: index,
      token: user.access_token,
    });
    setIndex(next.question_id);
    updatePrevQuestionID(index);
    updateNextQuestionId(next.question_id);
    setIsSkipLoading(false);
  }, [index, updateNextQuestionId, updatePrevQuestionID, user]);

  const submit = async () => {
    if (!user) return;
    setIsSubmitLoading(true);
    const next = await submitAnswer({
      questionId: index,
      answer: prevAnswer + (prevAnswer && answer ? " " : "") + answer, // Combine prev and current answers
      token: user.access_token,
    });
    setIsSubmitLoading(false);
    setAnswer("");
    setPrevAnswer(""); // Clear after submission
    updatePrevQuestionID(index);
    setIndex(next.question_id);
    updateNextQuestionId(next.question_id);
  };

  const toggleRecording = () => {
    if (isListening) {
      stopListening();
      setPrevAnswer((prev) => prev + (prev && text ? " " : "") + text); // Append new text to prevAnswer
      setAnswer(""); // Clear current answer ready for new input
    } else {
      startListening();
    }
  };

  useEffect(() => {
    if (text && isListening) {
      setAnswer(text);
    }
  }, [text, isListening]);

  const navigate = useNavigate();

  if (index === -1) navigate("/");
  if (!user) navigate("/");

  return (
    <div
      className={cc([
        "flex h-full w-full flex-col items-center justify-between overflow-hidden transition-all duration-500",
        dialog?.is_answerable &&
        isDialogEnd &&
        (!dialog.is_fixed || index === 1) &&
        !loading
          ? "pt-0"
          : "pt-24",
      ])}
      onClick={() => {
        if (loading) return;
        if (
          !dialog?.is_answerable &&
          isDialogEnd &&
          (!dialog.is_fixed || index === 1)
        ) {
          skip();
        }
        if (
          !dialog.is_answerable &&
          dialog.next_question_id === null &&
          index > 1
        ) {
          updatePrevQuestionID(-1);
          navigate("/");
        }
      }}
    >
      <img
        src={
          isListening || (dialog?.is_answerable && loading)
            ? "/bomi/write.gif"
            : playing
              ? "/bomi/speak.gif"
              : "/bomi/default.gif"
        }
        className="h-[200px]"
      />
      {dialog && (
        <>
          <div className="flex h-full items-start justify-center px-8 pt-8 text-center">
            {loading &&
              (dialog.is_answerable && answer ? (
                <div className="text-center">말씀하신 내용을 적고 있어요.</div>
              ) : (
                <div className="loading loading-dots" />
              ))}
            <LineSplit
              text={dialog.content}
              hasNext={!dialog.is_answerable}
              endDialog={() => setIsDialogEnd(true)}
              hidden={loading}
              muted={isListening}
              setPlaying={setPlaying}
            />
          </div>
          {!loading && (
            <div className="relative flex h-full w-full flex-col items-center justify-end overflow-hidden">
              <div className="absolute top-0 h-1/2 w-full bg-gradient-to-b from-white to-transparent" />
              <div className="break-keep px-8 text-center text-xl leading-relaxed">
                {prevAnswer + (prevAnswer && answer ? " " : "") + answer}
              </div>
            </div>
          )}
          <AnimatePresence>
            {dialog.is_answerable && isDialogEnd && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                className="flex h-[320px] w-full shrink-0 flex-col items-center gap-2 px-12 pb-12"
              >
                {hasRecognitionSupport && (
                  <button
                    onClick={toggleRecording}
                    disabled={loading}
                    className="font-sans-serif btn btn-circle btn-primary btn-lg relative mb-4 mt-8 h-32 w-32 text-5xl"
                  >
                    {isListening ? (
                      <>
                        <div className="animate-recording absolute inset-0 rounded-full bg-primary/10" />
                        <div className="loading loading-bars" />
                      </>
                    ) : (
                      <FaMicrophone />
                    )}
                  </button>
                )}
                {!isListening &&
                  (prevAnswer + (prevAnswer && answer ? " " : "") + answer)
                    .length > 0 && (
                    <button
                      className="font-sans-serif btn btn-primary w-full text-lg"
                      onClick={submit}
                    >
                      확인
                    </button>
                  )}
                {!isListening && !dialog.is_fixed && (
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
