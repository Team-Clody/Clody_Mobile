import { PatchNicknameRequestDTO } from './dto/myPage/request/patchNicknameRequestDTO';
import { GetAccountResponseDTO } from './dto/myPage/response/getAccountResponseDTO';
import { GetAlarmResponseDTO } from './dto/myPage/response/getAlarmResponseDTO';
import { createAPIRequest, HeaderType } from '../shared/http';
import { PostAlarmSetRequestDTO } from './dto/myPage/request/postAlarmSetRequestDTO';
import { PatchNicknameResponseDTO } from './dto/myPage/response/patchNicknameResponseDTO';

export const MyPageAPI = {
  getAccount: async (headerType: HeaderType = HeaderType.ACCESS_TOKEN) => {
    const resp = await createAPIRequest<GetAccountResponseDTO>(
      'get',
      '/user/info',
      headerType,
    );
    return resp.data.data;
  },
  getAlarmSet: async (headerType: HeaderType = HeaderType.ACCESS_TOKEN) => {
    const resp = await createAPIRequest<GetAlarmResponseDTO>(
      'get',
      '/alarm',
      headerType,
    );
    return resp.data.data;
  },
  postAlarmSet: async (
    requestDTO: PostAlarmSetRequestDTO,
    headerType: HeaderType = HeaderType.ACCESS_TOKEN,
  ) => {
    const resp = await createAPIRequest<GetAlarmResponseDTO>(
      'post',
      '/alarm',
      headerType,
      { data: requestDTO },
    );
    return resp.data.data;
  },
  patchNickname: async (
    requestDTO: PatchNicknameRequestDTO,
    headerType: HeaderType = HeaderType.ACCESS_TOKEN,
  ) => {
    const resp = await createAPIRequest<PatchNicknameResponseDTO>(
      'patch',
      '/user/nickname',
      headerType,
      requestDTO,
    );
    return resp.data.data;
  },
};
