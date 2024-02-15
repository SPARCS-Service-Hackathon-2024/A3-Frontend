export interface UserType {
  user_id: number;
  name: string;
  address: string | null;
  call: string | null;
  last_answered_question_id: number;
  access_token: string;
}
