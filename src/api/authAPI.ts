import { createAPIRequest } from '../shared/http';
import { HeaderType } from '../shared/http';
import { PostSigninResponseDTO } from './dto/response/postSigninReponseDTO';
import { PostSigninRequestDTO } from './dto/request/postSigninRequestDTO';
import { PostGoogleSigninRequestDTO } from './dto/request/postGoogleSigninRequestDTO';

export const AuthAPI = {
  postSignin: async (
    platformToken: string,
    requestDTO: PostSigninRequestDTO,
  ) => {
    const resp = await createAPIRequest<PostSigninResponseDTO>(
      'post',
      '/auth/signin',
      HeaderType.PLATFORM_TOKEN,
      requestDTO,
      undefined,
      platformToken,
    );
    return resp.data.data;
  },

  postGoogleSignin: async (requestDTO: PostGoogleSigninRequestDTO) => {
    const resp = await createAPIRequest<PostSigninResponseDTO>(
      'post',
      '/auth/oauth2/google',
      HeaderType.NON_AUTH,
      requestDTO,
    );
    return resp.data.data;
  },
};
