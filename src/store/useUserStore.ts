import { create } from 'zustand';

interface UserInfo {
  email: string;
  name: string;
  platform: string;
}

interface UserStore {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  clearUserInfo: () => void;
}

export const useUserStore = create<UserStore>(set => ({
  userInfo: null,
  setUserInfo: userInfo => set({ userInfo }),
  clearUserInfo: () => set({ userInfo: null }),
}));
