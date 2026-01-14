import { MyPageAPI } from '../../api/myPageApi';
import { useUserStore } from '../../store/useUserStore';

export const useMypage = () => {
  const { userInfo, setUserInfo } = useUserStore();

  const fetchUserInfo = async () => {
    try {
      const data = await MyPageAPI.getAccount();
      setUserInfo(data);
    } catch (error) {
      console.error('[useMypage] Failed to fetch user info:', error);
    }
  };

  return {
    userInfo,
    fetchUserInfo,
  };
};
