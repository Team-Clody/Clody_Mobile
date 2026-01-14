import { PatchNicknameResponseDTO } from './dto/myPage/response/patchNicknameResponseDTO';
import { GetAccountResponseDTO } from './dto/myPage/response/getAccountResponseDTO';
import { GetAlarmResponseDTO } from './dto/myPage/response/getAlarmResponseDTO';
import { createAPIRequest, HeaderType } from '../shared/http';
import { PostAlarmSetRequestDTO } from './dto/myPage/request/postAlarmSetRequestDTO';

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
    requestDTO: PatchNicknameResponseDTO,
    headerType: HeaderType = HeaderType.ACCESS_TOKEN,
  ) => {
    const resp = await createAPIRequest<PatchNicknameResponseDTO>(
      'patch',
      '/alarm',
      headerType,
      { data: requestDTO },
    );
    return resp.data.data;
  },
};
