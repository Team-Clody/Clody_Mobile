import { PatchNicknameRequestDTO } from '../../api/dto/myPage/request/patchNicknameRequestDTO';
import { MyPageAPI } from '../../api/myPageAPI';
import { useMyPageStore } from '../../store/useMyPageStore';

export const useMypage = () => {
  const { myPageInfo, setMyPageInfo } = useMyPageStore();

  const fetchMyPageInfo = async () => {
    try {
      const data = await MyPageAPI.getAccount();
      setMyPageInfo(data);
    } catch (error) {
      console.error('[useMypage] Failed to fetch user info:', error);
    }
  };

  const patchNickname = async (requestDTO: PatchNicknameRequestDTO) => {
    await MyPageAPI.patchNickname(requestDTO);
    await fetchMyPageInfo();
  };

  return {
    myPageInfo,
    fetchMyPageInfo,
    patchNickname,
  };
};
