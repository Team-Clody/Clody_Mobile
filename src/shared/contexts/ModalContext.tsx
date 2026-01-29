import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * 모달 타입 정의
 */
export type ModalType =
  | 'inspection'
  | 'softUpdate'
  | 'hardUpdate'
  | 'logout'
  | 'revoke'
  | string;

/**
 * 업데이트 모달 데이터
 */
export interface UpdateModalData {
  currentVersion: string;
  latestVersion: string;
}

/**
 * 점검 모달 데이터
 */
export interface InspectionModalData {
  inspectionStart: string;
  inspectionEnd: string;
}

/**
 * 전역 모달 상태 타입
 */
interface ModalContextValue {
  /** 현재 표시 중인 모달 타입 */
  visibleModal: ModalType | null;
  /** 모달 표시 */
  showModal: (
    modalType: ModalType,
    data?: UpdateModalData | InspectionModalData,
  ) => void;
  /** 모달 숨김 */
  hideModal: () => void;
  /** 특정 모달이 표시 중인지 확인 */
  isModalVisible: (modalType: ModalType) => boolean;
  /** 업데이트 모달 데이터 */
  updateModalData: UpdateModalData | null;
  /** 점검 모달 데이터 */
  inspectionModalData: InspectionModalData | null;
  /** 로그아웃 성공 여부 */
  isLogoutSuccess: boolean;
  /** 로그아웃 성공 플래그 설정 */
  setLogoutSuccess: (success: boolean) => void;
  /** 회원탈퇴 성공 여부 */
  isRevokeSuccess: boolean;
  /** 회원탈퇴 성공 플래그 설정 */
  setRevokeSuccess: (success: boolean) => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

/**
 * ModalProvider Props
 */
interface ModalProviderProps {
  children: ReactNode;
  /** 초기 모달 타입 (점검 시간 등 앱 시작 시 모달 표시용) */
  initialModal?: ModalType | null;
  /** 초기 업데이트 모달 데이터 */
  initialModalData?: UpdateModalData | null;
  /** 초기 점검 모달 데이터 */
  initialInspectionModalData?: InspectionModalData | null;
}

/**
 * 전역 모달 상태를 제공하는 Provider 컴포넌트
 * 앱 전역에서 여러 종류의 모달을 관리합니다.
 */
export const ModalProvider: React.FC<ModalProviderProps> = ({
  children,
  initialModal = null,
  initialModalData = null,
  initialInspectionModalData = null,
}) => {
  const [visibleModal, setVisibleModal] = useState<ModalType | null>(
    initialModal,
  );
  const [updateModalData, setUpdateModalData] =
    useState<UpdateModalData | null>(initialModalData);
  const [inspectionModalData, setInspectionModalData] =
    useState<InspectionModalData | null>(initialInspectionModalData);
  const [isLogoutSuccess, setIsLogoutSuccess] = useState(false);
  const [isRevokeSuccess, setIsRevokeSuccess] = useState(false);

  const showModal = (
    modalType: ModalType,
    data?: UpdateModalData | InspectionModalData,
  ) => {
    setVisibleModal(modalType);
    // 모달을 열 때 성공 플래그 초기화
    if (modalType === 'logout') {
      setIsLogoutSuccess(false);
    } else if (modalType === 'revoke') {
      setIsRevokeSuccess(false);
    } else if (modalType === 'softUpdate' || modalType === 'hardUpdate') {
      setUpdateModalData((data as UpdateModalData) || null);
    } else if (modalType === 'inspection') {
      setInspectionModalData((data as InspectionModalData) || null);
    }
  };

  const hideModal = () => {
    setVisibleModal(null);
    setUpdateModalData(null);
    setInspectionModalData(null);
  };

  const isModalVisible = (modalType: ModalType): boolean => {
    return visibleModal === modalType;
  };

  const setLogoutSuccess = (success: boolean) => {
    setIsLogoutSuccess(success);
  };

  const setRevokeSuccess = (success: boolean) => {
    setIsRevokeSuccess(success);
  };

  return (
    <ModalContext.Provider
      value={{
        visibleModal,
        showModal,
        hideModal,
        isModalVisible,
        updateModalData,
        inspectionModalData,
        isLogoutSuccess,
        setLogoutSuccess,
        isRevokeSuccess,
        setRevokeSuccess,
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
