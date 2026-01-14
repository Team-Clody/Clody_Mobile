import { createAPIRequest, HeaderType } from '../shared/http';

export interface UpdateNicknameRequestDTO {
  name: string;
}

export const OnboardingAPI = {
  updateNickname: async (
    body: UpdateNicknameRequestDTO,
    headerType: HeaderType = HeaderType.ACCESS_TOKEN,
  ) => {
    const resp = await createAPIRequest<void>(
      'patch',
      '/api/v1/user/nickname',
      headerType,
      body,
    );
    return resp.data;
  },
};
