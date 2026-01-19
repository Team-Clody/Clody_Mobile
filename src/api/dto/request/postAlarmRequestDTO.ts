export interface PostAlarmRequestDTO {
  isDiaryAlarm: boolean;
  isReplyAlarm: boolean;
  isDraftAlarm: boolean;
  fcmToken: string;
  time: string | null;
}
