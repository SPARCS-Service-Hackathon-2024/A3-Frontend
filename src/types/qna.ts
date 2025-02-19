export interface HistoryType {
  chapters: ChapterType[];
}

export interface ChapterType {
  chapter_id: number;
  chapter_title: string;
  qa_pairs: QAType[];
}

export interface QAType {
  question_id: number;
  question_content: string;
  answer_id: number;
  answer_content: string;
  created_at: string;
}
