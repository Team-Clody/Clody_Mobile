import React from 'react';
import { View } from 'react-native';
import { SectionPage, Typo } from '../../shared/components';

export const BirthdayScreen = () => {
  return (
    <SectionPage header={{ prefix: true }}>
      <View style={{ paddingHorizontal: 16 }}>
        <Typo.Head variant="head1">생년월일을 입력해주세요</Typo.Head>
      </View>
    </SectionPage>
  );
};
