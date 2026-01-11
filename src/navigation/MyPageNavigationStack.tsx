import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MyPageScreen } from '../screens/myPage/MyPageScreen';
import { ProfileAccountScreen } from '../screens/myPage/ProfileAccountScreen';
import { EditNicknameScreen } from '../screens/myPage/EditNicknameScreen';
import { TeamInfoScreen } from '../screens/myPage/TeamInfoScreen';

export enum MyPageRoutes {
  MY_PAGE = 'MyPage',
  PROFILE_ACCOUNT = 'ProfileAccount',
  EDIT_NICKNAME = 'EditNickname',
  TEAM_INFO = 'TeamInfo',
}

export type MyPageStackParamList = {
  [MyPageRoutes.MY_PAGE]: undefined;
  [MyPageRoutes.PROFILE_ACCOUNT]: undefined;
  [MyPageRoutes.EDIT_NICKNAME]: undefined;
  [MyPageRoutes.TEAM_INFO]: undefined;
};

const Stack = createStackNavigator<MyPageStackParamList>();

export const MyPageNavigationStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={MyPageRoutes.MY_PAGE}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={MyPageRoutes.MY_PAGE} component={MyPageScreen} />
      <Stack.Screen
        name={MyPageRoutes.PROFILE_ACCOUNT}
        component={ProfileAccountScreen}
      />
      <Stack.Screen
        name={MyPageRoutes.EDIT_NICKNAME}
        component={EditNicknameScreen}
      />
      <Stack.Screen name={MyPageRoutes.TEAM_INFO} component={TeamInfoScreen} />
    </Stack.Navigator>
  );
};
