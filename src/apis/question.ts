import { QuestionType } from "../types/question";

export const getQuestion = async ({
  questionId,
  token,
}: {
  questionId: number;
  token: string;
}) => {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/question/${questionId}`,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const json: QuestionType = await result.json();
  return json;
};

export const submitAnswer = async ({
  questionId,
  answer,
  token,
}: {
  questionId: number;
  answer: string;
  token: string;
}) => {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/question/${questionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify({ content: answer }),
    },
  );
  const json: { question_id: number } = await result.json();
  return json;
};

export const skipQuestion = async ({
  questionId,
  token,
}: {
  questionId: number;
  token: string;
}) => {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/question/${questionId}/skip`,
    {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const json: { question_id: number } = await result.json();
  return json;
};
