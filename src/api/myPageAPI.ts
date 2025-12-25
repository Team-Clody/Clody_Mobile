import { createAPIRequest, HeaderType } from '../shared/http';
import { GetAccountResponseDTO } from './dto/getAccountResponseDTO';

export const MyPageAPI = {
  fetchInfo: async (headerType: HeaderType = HeaderType.ACCESS_TOKEN) => {
    const resp = await createAPIRequest<GetAccountResponseDTO>(
      'get',
      '/user/info',
      headerType,
    );
    return resp.data.data;
  },
};
