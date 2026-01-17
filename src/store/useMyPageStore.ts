import { create } from 'zustand';

interface UserInfo {
  email: string;
  name: string;
  platform: string;
  gender: string;
  birthDate: string;
  cloverCount: number;
}

interface UseMyPage {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  clearUserInfo: () => void;
}

export const useMyPageStore = create<UseMyPage>(set => ({
  userInfo: null,
  setUserInfo: userInfo => set({ userInfo }),
  clearUserInfo: () => set({ userInfo: null }),
}));
