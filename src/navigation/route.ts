export const Routes = {
  LOGIN: 'Login',
  HOME: 'Home',
  CALENDAR: 'Calendar',
  MY_PAGE: 'MyPage',
  MAIN_TAB: 'MainTab',
  ONBOARDING_NICKNAME: 'OnboardingNickname',
  ONBOARDING_BIRTHDAY: 'OnboardingBirthday',
  ONBOARDING_BIRTHDAY_EN: 'OnboardingBirthday_En',
  ONBOARDING_GENDER: 'OnboardingGender',
  ONBOARDING_REMINDER: 'OnboardingReminder',
} as const;

export type StackNavParamList = {
  [Routes.LOGIN]: undefined;
  [Routes.ONBOARDING_NICKNAME]: undefined;
  [Routes.ONBOARDING_BIRTHDAY]: undefined;
  [Routes.ONBOARDING_BIRTHDAY_EN]: undefined;
  [Routes.ONBOARDING_GENDER]: undefined;
  [Routes.ONBOARDING_REMINDER]: undefined;
  [Routes.MAIN_TAB]: undefined;
};

export type BottomTabParamList = {
  [Routes.HOME]: undefined;
  [Routes.CALENDAR]: undefined;
  [Routes.MY_PAGE]: undefined;
};
