import { OpenAIApi, Configuration } from "openai";
import process from "process";

export default async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "text is required" });
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  try {
    const result = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "작가",
          content:
            "당신은 노인들의 이야기를 바탕으로 자서전을 작성하는 AI 작가입니다. 노인들의 이야기를 토대로 자신이 얘기한 것처럼 자서전에 맞는 글귀를 만들어주세요.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });
    return res.json({ answer: result.data.choices[0].message.content });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
