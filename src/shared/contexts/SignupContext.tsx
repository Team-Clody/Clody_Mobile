import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

export interface SignupData {
  platform: 'apple' | 'kakao' | 'google' | null;
  email: string;
  platformToken: string;
  name: string;
  gender: string | null;
  birthDate: string | null;
}

interface SignupContextValue {
  signupData: SignupData;
  setLoginInfo: (platform: 'apple' | 'kakao' | 'google', email: string, platformToken: string) => void;
  setName: (name: string) => void;
  setBirthInfo: (birthDate: string | null, gender: string | null) => void;
  resetSignupData: () => void;
}

const initialSignupData: SignupData = {
  platform: null,
  email: '',
  platformToken: '',
  name: '',
  gender: null,
  birthDate: null,
};

const SignupContext = createContext<SignupContextValue | undefined>(undefined);

interface SignupProviderProps {
  children: ReactNode;
}

export const SignupProvider: React.FC<SignupProviderProps> = ({ children }) => {
  const [signupData, setSignupData] = useState<SignupData>(initialSignupData);

  const setLoginInfo = useCallback((platform: 'apple' | 'kakao' | 'google', email: string, platformToken: string) => {
    setSignupData(prev => ({
      ...prev,
      platform,
      email,
      platformToken,
    }));
  }, []);

  const setName = useCallback((name: string) => {
    setSignupData(prev => ({
      ...prev,
      name,
    }));
  }, []);

  const setBirthInfo = useCallback((birthDate: string | null, gender: string | null) => {
    setSignupData(prev => ({
      ...prev,
      birthDate,
      gender,
    }));
  }, []);

  const resetSignupData = useCallback(() => {
    setSignupData(initialSignupData);
  }, []);

  return (
    <SignupContext.Provider
      value={{
        signupData,
        setLoginInfo,
        setName,
        setBirthInfo,
        resetSignupData,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = (): SignupContextValue => {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
};
