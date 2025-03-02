import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { tts } from "../libs/tts";
import { useUser } from "../store/useUser";
import cc from "classcat";

export default function LineSplit({
  text,
  hasNext,
  endDialog,
  hidden,
  muted,
  setPlaying,
}: {
  text: string;
  hasNext: boolean;
  endDialog: () => void;
  hidden: boolean;
  muted: boolean;
  setPlaying: (playing: boolean) => void;
}) {
  const [allLines, setAllLines] = useState<string[]>([]);
  const [lines, setLines] = useState<string[]>([]);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  const { user } = useUser();

  const addLine = useCallback(() => {
    if (allLines.length > lines.length) {
      setLines((lines) => [...lines, allLines[lines.length]]);
    } else {
      endDialog();
    }
  }, [allLines, lines]);

  const handlePlayTTS = useCallback(async () => {
    audio?.pause();
    setPlaying(false);
    const newAudio = await tts(
      text.replace(/%username%/g, user!.name).replace(/\\n/g, " "),
    );
    newAudio.play();
    newAudio.onplay = () => {
      setPlaying(true);
    };
    newAudio.onpause = () => {
      setPlaying(false);
    };
    setAudio(newAudio);
  }, [audio, setPlaying, text, user]);

  const mute = useCallback(() => {
    if (!audio) return;
    audio.volume = muted ? 0 : 1;
    setPlaying(!muted && !audio.paused);
  }, [audio, muted]);

  useEffect(() => {
    mute();
  }, [muted]);

  useEffect(() => {
    handlePlayTTS();
  }, [text]);

  useEffect(() => {
    const interval = setInterval(addLine, 400);
    return () => clearInterval(interval);
  }, [addLine]);

  useEffect(() => {
    if (!text) return;
    setAllLines(text.split("\\n"));
    setLines([]);
  }, [text]);

  return (
    <div className={cc(["line-split", hidden && "hidden"])}>
      <AnimatePresence>
        {lines.map(
          (line, index) =>
            line && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line.replace(/%username%/g, user!.name)}
                {text && index !== text.split("\\n").length - 1 && <br />}
              </motion.div>
            ),
        )}
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
