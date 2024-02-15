import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
//@ts-expect-error no type definition
import { useSpeechSynthesis } from "react-speech-kit";
import { tts } from "../libs/tts";

export default function LineSplit({
  text,
  hasNext,
  endDialog,
}: {
  text: string;
  hasNext: boolean;
  endDialog: () => void;
}) {
  const [allLines, setAllLines] = useState<string[]>([]);
  const [lines, setLines] = useState<string[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const addLine = useCallback(() => {
    if (allLines.length > lines.length) {
      setLines((lines) => [...lines, allLines[lines.length]]);
    } else {
      endDialog();
    }
  }, [allLines, lines]);

  const playTTS = useCallback(async () => {
    const newAudio = await tts(text);
    if (audio) audio.pause();
    setAudio(newAudio);
    newAudio.play();
  }, [audio, text]);

  useEffect(() => {
    const interval = setInterval(addLine, 10);
    return () => clearInterval(interval);
  }, [addLine]);

  useEffect(() => {
    setAllLines(text.split("\n"));
    setLines([]);
    playTTS();
  }, [text]);

  return (
    <div className="line-split">
      <AnimatePresence>
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {line}
            {index !== text.split("\n").length - 1 && <br />}
          </motion.div>
        ))}
        {lines.length === allLines.length && hasNext && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 1 } }}
            exit={{ opacity: 0 }}
            className="mt-4 text-base opacity-40"
          >
            계속
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
