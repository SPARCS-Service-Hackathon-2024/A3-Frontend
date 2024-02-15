export interface ResultType {
  chapter_id: number;
  chapter_title: string;
  summaries: {
    summary_id: number;
    question: string;
    content: string;
  }[];
}
