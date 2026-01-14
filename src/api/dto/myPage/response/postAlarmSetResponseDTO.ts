export interface PostAlarmSetResponseDTO {
  isDiaryAlarm: boolean;
  isDraftAlarm: boolean;
  isReplyAlarm: boolean;
  time: string;
  fcmToken: string;
}
