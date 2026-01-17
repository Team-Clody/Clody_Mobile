import { PatchNicknameRequestDTO } from '../../api/dto/myPage/request/patchNicknameRequestDTO';
import { MyPageAPI } from '../../api/myPageAPI';
import { useMyPageStore } from '../../store/useMyPageStore';

export const useMypage = () => {
  const { userInfo, setUserInfo } = useMyPageStore();

  const fetchUserInfo = async () => {
    try {
      const data = await MyPageAPI.getAccount();
      setUserInfo(data);
    } catch (error) {
      console.error('[useMypage] Failed to fetch user info:', error);
    }
  };

  const patchNickname = async (requestDTO: PatchNicknameRequestDTO) => {
    await MyPageAPI.patchNickname(requestDTO);
    await fetchUserInfo();
  };

  return {
    userInfo,
    fetchUserInfo,
    patchNickname,
  };
};
