import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { kakaoLogin } from '../auth/kakaoAuth';
import { handleLogin } from '../auth/handleLogin';
import { Routes, StackNavParamList } from '../navigation/route';
import { appleLogin } from '../auth/appleAuth';
import { googleLogin, configureGoogleSignIn } from '../auth/googleAuth';
import { Typo } from '../shared/components/Typo';
import { palette } from '../shared/theme/palette';

const PAGES = [
  {
    chip: 'AI 친구 로디',
    title: '감사일기에 칭찬과 응원의\n답장을 작성해요',
    image: require('../../assets/img_signin_pager_1.png'),
  },
  {
    chip: '행운의 클로버',
    title: '하루에 기록한 감사가\n쌓일수록 클로버가 진해져요',
    image: require('../../assets/img_signin_pager_2.png'),
  },
  {
    chip: '감사일기',
    title: '오늘과 전날 일기만\n작성할 수 있어요',
    image: require('../../assets/img_signin_pager_3.png'),
  },
];

const SignInButton = ({
  backgroundColor,
  icon,
  textColor,
  text,
  onPress,
}: {
  backgroundColor: string;
  icon: any;
  textColor: string;
  text: string;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.signinButton, { backgroundColor }]}
    >
      <Image
        style={{ width: 16, height: 16 }}
        source={icon}
        resizeMode="contain"
      />
      <Typo.Body variant="body2" color={textColor} style={{ marginLeft: 8 }}>
        {text}
      </Typo.Body>
    </TouchableOpacity>
  );
};

type LoginScreenNavigationProp = StackNavigationProp<
  StackNavParamList,
  Routes.LOGIN
>;

const LoginScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const onPressKakaoLogin = async () => {
    const success = await handleLogin('kakao', kakaoLogin);
    if (success) {
      navigation.navigate(Routes.HOME);
    }
  };

  const onPressAppleLogin = async () => {
    const success = await handleLogin('apple', appleLogin);
    if (success) {
      navigation.navigate(Routes.HOME);
    }
  };

  const onPressGoogleLogin = async () => {
    const success = await handleLogin('google', googleLogin);
    if (success) {
      navigation.navigate(Routes.HOME);
    }
  };

  return (
    <View style={styles.container}>
      {/* 상단 콘텐츠 영역 */}
      <View style={styles.pagerWrapper}>
        <View style={{ flex: 11 }} />

        <PagerView
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={e => setCurrentPage(e.nativeEvent.position)}
        >
          {PAGES.map((page, index) => (
            <View key={index} style={styles.page}>
              <View style={styles.chip}>
                <Typo.Body variant="body10" color="gray600">
                  {page.chip}
                </Typo.Body>
              </View>

              <Typo.Display
                variant="display2"
                color="gray1000"
                center
                style={styles.titleText}
              >
                {page.title}
              </Typo.Display>

              <Image
                source={page.image}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          ))}
        </PagerView>

        <View style={styles.indicatorWrapper}>
          {PAGES.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentPage === index && styles.activeDot]}
            />
          ))}
        </View>

        <View style={{ flex: 17 }} />
      </View>

      {/* 하단 로그인 버튼 영역 */}
      <SignInButton
        backgroundColor={palette.kakaoYellow}
        textColor="gray900"
        icon={require('../../assets/ic_signin_btn_kakao.png')}
        text="카카오로 로그인"
        onPress={onPressKakaoLogin}
      />

      <SignInButton
        backgroundColor={palette.appleBlack}
        textColor="gray0"
        icon={require('../../assets/ic_signin_btn_apple.png')}
        text="Apple로 로그인"
        onPress={onPressAppleLogin}
      />

      <SignInButton
        backgroundColor={palette.gray30}
        textColor="gray1000"
        icon={require('../../assets/ic_signin_btn_google.png')}
        text="구글로 로그인"
        onPress={onPressGoogleLogin}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: palette.gray0,
  },

  pagerWrapper: {
    flex: 1,
  },

  pagerView: {
    flex: 34,
    justifyContent: 'center',
  },

  page: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  chip: {
    backgroundColor: palette.gray50,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  titleText: {
    marginTop: 16,
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 173,
  },

  indicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },

  dot: {
    backgroundColor: palette.gray200,
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: palette.gray900,
  },

  signinButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 6,
    paddingVertical: 14,
    marginVertical: 7,
  },
});
