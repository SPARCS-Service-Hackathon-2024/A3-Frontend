export interface KakaoLoginResponseType {
  response: {
    token_type: string;
    access_token: string;
    expires_in: string;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: string;
  };
  profile?: {
    id: number;
    kakao_account: {
      profile: {
        nickname: string;
        profile_image: string;
        thumbnail_image_url: string;
        profile_needs_agreement?: boolean;
      };
      email: string;
      age_range: string;
      birthday: string;
      birthyear: string;
      gender: "female" | "male";
      phone_number: string;
      ci: string;
    };
    synched_at: string;
    connected_at: string;
    properties: {
      nickname: string;
      profile_image: string;
      thumbnail_image_url: string;
      profile_needs_agreement?: boolean;
    };
  };
}
