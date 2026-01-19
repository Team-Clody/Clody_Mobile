import { createAPIRequest } from '../shared/http';
import { HeaderType } from '../shared/http';
import { PostAlarmRequestDTO } from './dto/request/postAlarmRequestDTO';

export const AlarmAPI = {
  postAlarm: async (requestDTO: PostAlarmRequestDTO) => {
    const resp = await createAPIRequest<void>(
      'post',
      '/api/v1/alarm',
      HeaderType.ACCESS_TOKEN,
      requestDTO,
    );
    return resp.data;
  },
};
