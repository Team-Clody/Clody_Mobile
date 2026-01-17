import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

import { BottomTabParamList, Routes } from './route';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import { MyPageScreen } from '../screens/myPage/MyPageScreen';
import { Icon } from '../shared/components/Icon';
import { palette } from '../shared/theme/palette';
import { typography } from '../shared/theme/typography';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabIcon = ({
  focused,
  onIcon,
  offIcon,
  label,
}: {
  focused: boolean;
  onIcon: React.ComponentType<SvgProps>;
  offIcon: React.ComponentType<SvgProps>;
  label: string;
}) => {
  const ActiveIcon = focused ? onIcon : offIcon;

  return (
    <View style={styles.iconContainer}>
      <ActiveIcon width={24} height={24} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export const BottomTabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: [
          styles.tabBar,
          {
            paddingBottom: insets.bottom,
          },
        ],
        tabBarItemStyle: {
          paddingTop: 14,
          paddingBottom: 14,
        },
      }}
    >
      <Tab.Screen
        name={Routes.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              onIcon={Icon.IcHomeOn}
              offIcon={Icon.IcHomeOff}
              label="홈"
            />
          ),
        }}
      />

      <Tab.Screen
        name={Routes.CALENDAR}
        component={CalendarScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              onIcon={Icon.IcCalendarOn}
              offIcon={Icon.IcCalendarOff}
              label="캘린더"
            />
          ),
        }}
      />

      <Tab.Screen
        name={Routes.MY_PAGE}
        component={MyPageScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              onIcon={Icon.IcMyOn}
              offIcon={Icon.IcMyOff}
              label="마이페이지"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: palette.gray0,
    borderTopWidth: 0,
    elevation: 0,
  },

  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 56,
  },

  label: {
    marginTop: 4,
    marginBottom: 14,
    ...typography.body13,
    color: palette.gray900,
  },
});

export default BottomTabNavigator;
