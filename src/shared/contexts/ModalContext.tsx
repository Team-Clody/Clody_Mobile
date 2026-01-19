import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * 모달 타입 정의
 */
export type ModalType = 'logout' | 'revoke' | string;

/**
 * 전역 모달 상태 타입
 */
interface ModalContextValue {
  /** 현재 표시 중인 모달 타입 */
  visibleModal: ModalType | null;
  /** 모달 표시 */
  showModal: (modalType: ModalType) => void;
  /** 모달 숨김 */
  hideModal: () => void;
  /** 특정 모달이 표시 중인지 확인 */
  isModalVisible: (modalType: ModalType) => boolean;
  /** 로그아웃 성공 여부 */
  isLogoutSuccess: boolean;
  /** 로그아웃 성공 플래그 설정 */
  setLogoutSuccess: (success: boolean) => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

/**
 * ModalProvider Props
 */
interface ModalProviderProps {
  children: ReactNode;
}

/**
 * 전역 모달 상태를 제공하는 Provider 컴포넌트
 * 앱 전역에서 여러 종류의 모달을 관리합니다.
 */
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [visibleModal, setVisibleModal] = useState<ModalType | null>(null);
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);

  const showModal = (modalType: ModalType) => {
    setVisibleModal(modalType);
    // 모달을 열 때 로그아웃 성공 플래그 초기화
    if (modalType === 'logout') {
      setIsLogoutSuccess(false);
    }
  };

  const hideModal = () => {
    setVisibleModal(null);
  };

  const isModalVisible = (modalType: ModalType): boolean => {
    return visibleModal === modalType;
  };

  const setLogoutSuccess = (success: boolean) => {
    setIsLogoutSuccess(success);
  };

  return (
    <ModalContext.Provider
      value={{
        visibleModal,
        showModal,
        hideModal,
        isModalVisible,
        isLogoutSuccess,
        setLogoutSuccess,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

/**
 * ModalContext를 사용하는 커스텀 훅
 * @throws ModalProvider로 감싸지 않은 경우 에러 발생
 */
export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
