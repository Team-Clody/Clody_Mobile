import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { kakaoLogin } from '../../auth/kakaoAuth';
import { handleLogin } from '../../auth/handleLogin';
import { Routes, StackNavParamList } from '../../navigation/route';
import { appleLogin } from '../../auth/appleAuth';
import { googleLogin, configureGoogleSignIn } from '../../auth/googleAuth';
import { Typo } from '../../shared/components/Typo';
import { palette } from '../../shared/theme/palette';
import { useDevice } from '../../shared/contexts/DeviceContext';
import { useTranslation } from '../../shared/hooks/useTranslation';
import { LoginButton } from './LoginButton';

type LoginScreenNavigationProp = StackNavigationProp<
  StackNavParamList,
  typeof Routes.LOGIN
>;

const LoginScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { availableLoginButtons } = useDevice();
  const { t } = useTranslation();

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const PAGES = useMemo(
    () => [
      {
        chip: t('login.pager.page1.chip'),
        title: t('login.pager.page1.title'),
        image: require('../../../assets/images/img_signin_pager_1.png'),
      },
      {
        chip: t('login.pager.page2.chip'),
        title: t('login.pager.page2.title'),
        image: require('../../../assets/images/img_signin_pager_2.png'),
      },
      {
        chip: t('login.pager.page3.chip'),
        title: t('login.pager.page3.title'),
        image: require('../../../assets/images/img_signin_pager_3.png'),
      },
    ],
    [t],
  );

  const loginButtons = useMemo(() => {
    const buttons = [];

    if (availableLoginButtons.includes('kakao')) {
      buttons.push(
        <LoginButton
          key="kakao"
          backgroundColor={palette.kakaoYellow}
          textColor="gray900"
          icon={require('../../../assets/images/ic_signin_btn_kakao.png')}
          text={t('login.buttons.kakao')}
          onPress={async () => {
            const success = await handleLogin('kakao', kakaoLogin);
            if (success) {
              navigation.navigate(Routes.ONBOARDING_NICKNAME);
            }
          }}
        />,
      );
    }

    if (availableLoginButtons.includes('apple')) {
      buttons.push(
        <LoginButton
          key="apple"
          backgroundColor={palette.appleBlack}
          textColor="gray0"
          icon={require('../../../assets/images/ic_signin_btn_apple.png')}
          text={t('login.buttons.apple')}
          onPress={async () => {
            const success = await handleLogin('apple', appleLogin);
            if (success) {
              navigation.navigate(Routes.ONBOARDING_NICKNAME);
            }
          }}
        />,
      );
    }

    if (availableLoginButtons.includes('google')) {
      buttons.push(
        <LoginButton
          key="google"
          backgroundColor={palette.gray30}
          textColor="gray1000"
          icon={require('../../../assets/images/ic_signin_btn_google.png')}
          text={t('login.buttons.google')}
          onPress={async () => {
            const success = await handleLogin('google', googleLogin);
            if (success) {
              navigation.navigate(Routes.ONBOARDING_NICKNAME);
            }
          }}
        />,
      );
    }

    return buttons;
  }, [availableLoginButtons, navigation, t]);

  return (
    <View style={styles.container}>
      {/* 상단 콘텐츠 영역 */}
      <View style={styles.pagerWrapper}>
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
      </View>

      {/* 하단 로그인 버튼 영역 */}
      <View style={styles.buttonContainer}>{loginButtons}</View>
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
    marginTop: 100,
    height: 400,
  },

  page: {
    flex: 1,
    alignItems: 'center',
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
    marginTop: -50,
    flexDirection: 'row',
    justifyContent: 'center',
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

  buttonContainer: {
    paddingBottom: 30,
  },
});
