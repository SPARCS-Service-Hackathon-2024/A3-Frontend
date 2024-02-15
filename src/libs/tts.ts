import OpenAI from "openai";
import { Buffer } from "buffer";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const tts = async (text: string) => {
  const buffer = Buffer.from(
    await (
      await openai.audio.speech.create({
        model: "tts-1",
        voice: "nova",
        input: text,
      })
    ).arrayBuffer(),
  );
  const audio = new Audio(URL.createObjectURL(new Blob([buffer])));
  return audio;
};
