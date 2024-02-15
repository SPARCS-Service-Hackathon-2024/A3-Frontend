import { useCallback, useEffect, useState } from "react";
import Layout from "../components/layout";
import Modal from "../components/layout/Modal"; // Adjust the import path as needed
import * as backgrounds from "../components/backgrounds";
import { ResultType } from "../types/result";
import { getResult } from "../apis/result";
import { useUser } from "../store/useUser";
import { LuImage } from "react-icons/lu";
import { FaChevronRight } from "react-icons/fa6";

function splitTextIntoChunks(text: string) {
  const sentences: string[] = text.match(/[^.!?]+[.!?]+/g) || [];
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    chunks.push(sentences.slice(i, i + 2).join(" "));
  }
  return chunks;
}

export default function Result() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const backgroundImages = Object.values(backgrounds).slice(0, 4);
  const [selectedBackground, setSelectedBackground] = useState(
    backgroundImages[0],
  );

  const { user } = useUser();
  const [results, setResults] = useState<ResultType[]>([]);
  const [index, setIndex] = useState(0);

  const fetchResult = useCallback(async () => {
    if (!user) return;
    const res = await getResult({ token: user.access_token });
    setResults(res);
  }, [user]);

  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  return (
    <Layout>
      <div
        className="flex h-screen w-full flex-col items-center bg-cover bg-fixed bg-center px-12 py-16 text-2xl"
        style={{
          backgroundImage: `url(${selectedBackground})`,
        }}
      >
        {results[index] && (
          <div className="flex h-full w-full flex-col items-center overflow-auto py-8">
            <div key={index}>
              <div className="mb-4 border-b border-b-black py-2 text-left text-2xl font-bold">
                {results[index].chapter_title}
              </div>
              {results[index].summaries.map((summary) => (
                <div
                  key={summary.summary_id}
                  className="mb-8 border-b border-b-black/20 pb-4 text-center"
                >
                  <div>{summary.question.replace("%username%", user.name)}</div>
                  {splitTextIntoChunks(summary.content).map(
                    (chunk, chunkIndex) => (
                      <div
                        key={chunkIndex}
                        className="mb-8 mt-8 text-center text-xl"
                      >
                        {chunk.replace("%username%", user.name || "")}
                      </div>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="[&>*]:font-sans-serif absolute inset-x-0 bottom-0 grid h-16 w-full grid-cols-3 items-center justify-items-center bg-white">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4"
        >
          <LuImage />
          배경 바꾸기
        </button>
        <div>
          {index + 1} / {results.length}
        </div>
        <button
          onClick={() => {
            setIndex((prev) => Math.min(prev + 1, results.length - 1));
          }}
          disabled={index === results.length - 1}
          className="flex items-center gap-2 px-4 disabled:opacity-50"
        >
          다음 페이지
          <FaChevronRight />
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="mb-4 text-xl font-bold">원하는 배경을 골라주세요</h2>
        <div className="grid grid-cols-2 gap-4">
          {backgroundImages.map((bg, index) => (
            <img
              key={index}
              src={bg}
              alt={`Background ${index + 1}`}
              className="h-48 w-full cursor-pointer rounded-md object-cover shadow-lg"
              onClick={() => {
                setSelectedBackground(bg);
                setIsModalOpen(false);
              }}
            />
          ))}
        </div>
      </Modal>
    </Layout>
  );
}
