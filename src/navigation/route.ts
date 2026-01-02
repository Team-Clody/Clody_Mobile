export enum Routes {
  LOGIN = 'login',
  HOME = 'home',
}

export type StackNavParamList = {
  [Routes.LOGIN]: undefined;
  [Routes.HOME]: undefined;
};
