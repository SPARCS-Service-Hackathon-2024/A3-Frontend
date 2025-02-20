export interface QuestionType {
  id: number;
  content: string;
  is_answerable: boolean;
  next_question_id: number | null;
  is_fixed: boolean;
}
