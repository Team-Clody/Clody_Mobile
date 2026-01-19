import { createAPIRequest } from '../shared/http';
import { HeaderType } from '../shared/http';
import { PostSigninResponseDTO } from './dto/response/postSigninReponseDTO';
import { PostSigninRequestDTO } from './dto/request/postSigninRequestDTO';
import { PostGoogleSigninRequestDTO } from './dto/request/postGoogleSigninRequestDTO';
import { PostSignupRequestDTO } from './dto/request/postSignupRequestDTO';
import { DeleteUserResponseDTO } from './dto/response/deleteUserResponseDTO';

export const AuthAPI = {
  postSignin: async (
    platformToken: string,
    requestDTO: PostSigninRequestDTO,
  ) => {
    const resp = await createAPIRequest<PostSigninResponseDTO>(
      'post',
      '/api/v1/auth/signin',
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
      '/api/v1/auth/oauth2/google',
      HeaderType.NON_AUTH,
      requestDTO,
    );
    return resp.data.data;
  },

  postSignup: async (
    platformToken: string,
    requestDTO: PostSignupRequestDTO,
  ) => {
    const resp = await createAPIRequest<PostSigninResponseDTO>(
      'post',
      '/api/v1/auth/signup',
      HeaderType.PLATFORM_TOKEN,
      requestDTO,
      undefined,
      platformToken,
    );
    return resp.data.data;
  },

  deleteUser: async () => {
    const resp = await createAPIRequest<DeleteUserResponseDTO>(
      'delete',
      '/api/v1/user/revoke',
      HeaderType.ACCESS_TOKEN,
      undefined,
      undefined,
    );
    return resp.data.data;
  },
};
