import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast } from '../components/Toast';

/**
 * 토스트 옵션 타입
 */
interface ToastOptions {
  /** 토스트 표시 시간 (ms) */
  duration?: number;
}

/**
 * 전역 토스트 상태 타입
 */
interface ToastContextValue {
  /** 토스트 표시 */
  showToast: (message: string, options?: ToastOptions) => void;
  /** 토스트 숨김 */
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * ToastProvider Props
 */
interface ToastProviderProps {
  children: ReactNode;
}

/**
 * 전역 토스트 상태를 제공하는 Provider 컴포넌트
 * 앱 전역에서 토스트 메시지를 표시합니다.
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(2000);

  const showToast = (msg: string, options?: ToastOptions) => {
    setMessage(msg);
    setDuration(options?.duration || 2000);
    setVisible(true);
  };

  const hideToast = () => {
    setVisible(false);
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        hideToast,
      }}
    >
      {children}
      <Toast
        message={message}
        visible={visible}
        duration={duration}
        onHide={hideToast}
      />
    </ToastContext.Provider>
  );
};

/**
 * ToastContext를 사용하는 커스텀 훅
 * @throws ToastProvider로 감싸지 않은 경우 에러 발생
 */
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
