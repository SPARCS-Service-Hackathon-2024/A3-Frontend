export const getQuestion = async ({ questionId }: { questionId: number }) => {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/question/${questionId}`,
  );
  const json = await result.json();
  return json;
};

export const submitAnswer = async ({
  questionId,
  answer,
}: {
  questionId: number;
  answer: string;
}) => {
  const result = await fetch(
    `${import.meta.env.VITE_API_URL}/question/${questionId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ answer }),
    },
  );
  const json = await result.json();
  return json;
};
