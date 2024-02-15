import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { tts } from "../libs/tts";
import { useUser } from "../store/useUser";
import debounce from "lodash.debounce";

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

  const { user } = useUser();

  const addLine = useCallback(() => {
    if (allLines.length > lines.length) {
      setLines((lines) => [...lines, allLines[lines.length]]);
    } else {
      endDialog();
    }
  }, [allLines, lines]);

  const playTTS = useCallback(
    () =>
      debounce(async () => {
        if (!user || !text) return;
        const audio = await tts(text.replace("%username%", user!.name));
        audio.play();
      }, 100),
    [text],
  );

  useEffect(() => {
    playTTS();
  }, [playTTS]);

  useEffect(() => {
    const interval = setInterval(addLine, 400);
    return () => clearInterval(interval);
  }, [addLine]);

  useEffect(() => {
    setAllLines(text.split("\\n"));
    setLines([]);
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
            {line.replace("%username%", user!.name)}
            {index !== text.split("\\n").length - 1 && <br />}
          </motion.div>
        ))}
        {lines.length === allLines.length && hasNext && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4 } }}
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
