export interface PostSignupRequestDTO {
  platform: 'apple' | 'kakao' | 'google';
  email: string;
  name: string;
  fcmToken: string;
  gender?: string;
  birthDate?: string;
}
