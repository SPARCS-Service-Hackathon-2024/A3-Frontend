import { Fragment, useCallback, useEffect, useState } from "react";
import Layout from "../components/layout";
import { format } from "date-fns";
import { useUser } from "../store/useUser";
import { getHistory } from "../apis/qna";
import { HistoryType } from "../types/qna";

export default function QnA() {
  const { user } = useUser();
  const [histories, setHistories] = useState<HistoryType | null>(null);

  const fetchResult = useCallback(async () => {
    if (!user) return;
    const res = await getHistory({ token: user.access_token });
    setHistories(res);
  }, [user]);

  useEffect(() => {
    fetchResult();
  }, [fetchResult]);

  return (
    <Layout>
      <div className="flex h-screen w-full flex-col items-center justify-center px-8 py-16 text-2xl">
        {!histories && <div className="loading loading-dots" />}
        <div className="flex h-full w-full flex-col gap-2 pb-16">
          {histories?.chapters.map((chapter, i) => (
            <div key={i}>
              <div className="mb-4 underline underline-offset-4">
                {chapter.chapter_title}
              </div>
              {chapter.qa_pairs.map((qa, ii) => (
                <div key={ii} className="text-xl">
                  <div className="chat chat-start">
                    <div className="chat-header">
                      <time className="text-xs opacity-50">
                        {format(
                          new Date(qa.created_at),
                          "yy년 MM월 dd일 HH시 ss분",
                        )}
                      </time>
                    </div>
                    <div className="chat-bubble text-lg">
                      {qa.question_content
                        .replace(/%username%/g, user?.name || "")
                        .split("\\n")
                        .filter((line) => line.length > 0)
                        .map((line, iii) => (
                          <Fragment key={iii}>
                            <span>{line}</span>
                            {iii < qa.question_content.length && <br />}
                          </Fragment>
                        ))}
                    </div>
                  </div>
                  <div className="chat chat-end">
                    <div className="chat-bubble chat-bubble-secondary text-lg">
                      {qa.answer_content
                        .split("\\n")
                        .filter((line) => line.length > 0)
                        .map((line, iii) => (
                          <Fragment key={iii}>
                            <span>{line}</span>
                            {iii < qa.answer_content.length && <br />}
                          </Fragment>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
