export enum Routes {
  LOGIN = 'login',
  HOME = 'home',
  ONBOARDING_NICKNAME = 'onboarding-nickname',
  ONBOARDING_BIRTHDAY = 'onboarding-birthday',
  ONBOARDING_REMINDER = 'onboarding-reminder',
}

export type StackNavParamList = {
  [Routes.LOGIN]: undefined;
  [Routes.HOME]: undefined;
  [Routes.ONBOARDING_NICKNAME]: undefined;
  [Routes.ONBOARDING_BIRTHDAY]: undefined;
  [Routes.ONBOARDING_REMINDER]: undefined;
};
