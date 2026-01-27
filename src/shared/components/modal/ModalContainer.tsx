import React from 'react';
import { InspectionModal } from './InspectionModal';
import { LogoutModal } from './LogoutModal';
import { RevokeModal } from './RevokeModal';

/**
 * 전역 모달을 렌더링하는 컨테이너 컴포넌트
 * App.tsx 최상위에 배치하여 모든 화면에서 모달을 사용할 수 있도록 합니다.
 */
export const ModalContainer = () => {
  return (
    <>
      <InspectionModal />
      <LogoutModal />
      <RevokeModal />
    </>
  );
};
