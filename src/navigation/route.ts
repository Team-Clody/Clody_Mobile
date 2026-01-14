export const Routes = {
  LOGIN: 'Login',
  HOME: 'Home',
  CALENDAR: 'Calendar',
  MY_PAGE: 'MyPage',
  MAIN_TAB: 'MainTab',
} as const;

export type StackNavParamList = {
  [Routes.LOGIN]: undefined;
  [Routes.MAIN_TAB]: undefined;
};

export type BottomTabParamList = {
  [Routes.HOME]: undefined;
  [Routes.CALENDAR]: undefined;
  [Routes.MY_PAGE]: undefined;
};
