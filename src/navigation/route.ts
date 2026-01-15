export const Routes = {
  LOGIN: 'Login',
  HOME: 'Home',
  CALENDAR: 'Calendar',
  MY_PAGE: 'MyPage',
  MAIN_TAB: 'MainTab',
  ONBOARDING_NICKNAME: 'OnboardingNickname',
  ONBOARDING_BIRTHDAY: 'OnboardingBirthday',
} as const;

export type StackNavParamList = {
  [Routes.LOGIN]: undefined;
  [Routes.MAIN_TAB]: undefined;
  [Routes.ONBOARDING_NICKNAME]: undefined;
  [Routes.ONBOARDING_BIRTHDAY]: undefined;
};

export type BottomTabParamList = {
  [Routes.HOME]: undefined;
  [Routes.CALENDAR]: undefined;
  [Routes.MY_PAGE]: undefined;
};
