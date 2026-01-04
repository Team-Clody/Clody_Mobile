import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PagerView from 'react-native-pager-view';

import KakaoIcon from '../../assets/ic_signin_btn_kakao.svg';
import AppleIcon from '../../assets/ic_signin_btn_apple.svg';
import GoogleIcon from '../../assets/ic_signin_btn_google.svg';

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
  Icon,
  textColor,
  text,
}: {
  backgroundColor: string;
  Icon: React.FC<{ width?: number; height?: number }>;
  textColor: string;
  text: string;
}) => {
  return (
    <View style={[styles.signinButton, { backgroundColor }]}>
      <Icon width={20} height={20} />
      <Text style={[styles.signinButtonText, { color: textColor }]}>
        {text}
      </Text>
    </View>
  );
};

const LoginScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.pagerWrapper}>
        <PagerView
          initialPage={0}
          onPageSelected={e => setCurrentPage(e.nativeEvent.position)}
        >
          {PAGES.map((page, index) => (
            <View key={index} style={styles.page}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>{page.chip}</Text>
              </View>

              <Text style={styles.titleText}>{page.title}</Text>

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

      <SignInButton
        backgroundColor="#FAE100"
        textColor="#212124"
        Icon={KakaoIcon}
        text="카카오로 로그인"
      />

      <SignInButton
        backgroundColor="#111111"
        textColor="#FFFFFF"
        Icon={AppleIcon}
        text="Apple로 로그인"
      />

      <SignInButton
        backgroundColor="#F8F9FC"
        textColor="#1B1C20"
        Icon={GoogleIcon}
        text="구글로 로그인"
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 14,
    backgroundColor: '#FFFFFF',
  },

  pagerWrapper: {
    flex: 1,
    justifyContent: 'center',
  },

  page: {
    alignItems: 'center',
  },

  chip: {
    backgroundColor: '#F2F3F6',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  chipText: {
    fontSize: 14,
    color: '#4A4C54',
  },

  titleText: {
    marginTop: 16,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 26,
    color: '#1B1C20',
  },

  image: {
    width: '100%',
    height: 173,
  },

  indicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 24,
  },

  dot: {
    backgroundColor: '#D1D5DD',
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },

  activeDot: {
    backgroundColor: '#212124',
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

  signinButtonText: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22.5,
    marginLeft: 8,
  },
});
