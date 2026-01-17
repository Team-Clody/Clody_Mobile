import { create } from 'zustand';
import { GetAccountResponseDTO } from '../api/dto/myPage/response/getAccountResponseDTO';

interface UseMyPage {
  myPageInfo: GetAccountResponseDTO | null;
  setMyPageInfo: (userInfo: GetAccountResponseDTO) => void;
  clearMyPageInfo: () => void;
}

export const useMyPageStore = create<UseMyPage>(set => ({
  myPageInfo: null,
  setMyPageInfo: userInfo => set({ myPageInfo: userInfo }),
  clearMyPageInfo: () => set({ myPageInfo: null }),
}));
