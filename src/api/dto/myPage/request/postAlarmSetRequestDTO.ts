export interface PostAlarmSetRequestDTO {
  isDiaryAlarm: boolean;
  isDraftAlarm: boolean;
  isReplyAlarm: boolean;
  time: string;
  fcmToken: string;
}
