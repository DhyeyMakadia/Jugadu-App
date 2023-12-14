import { AxiosResponse } from 'axios';
import httpClient from '../httpClient';
import {
  DEFAULT_RESPONSE_TYPE,
  LoginRequest,
  LoginResponse,
  SignUpRequest,
  SignUpResponse
} from '../types/auth';
import {
  AddRashiRequest,
  AddRashiResponse,
  RashiResponse
} from '../types/rashi';

const controller = 'zodiac';

class RashiService {
  GetAllRashi = async (): Promise<AxiosResponse<RashiResponse>> =>
    httpClient.get(`${controller}/read`);

  AddRashi = async (
    payload: AddRashiRequest
  ): Promise<AxiosResponse<AddRashiResponse>> => {
    return httpClient.post(`${controller}/create`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  UpdateRashi = async (
    id: number,
    payload: AddRashiRequest
  ): Promise<AxiosResponse<AddRashiResponse>> => {
    return httpClient.put(`${controller}/update/${id}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  };

  DeleteRashi = async (
    id: number
  ): Promise<AxiosResponse<DEFAULT_RESPONSE_TYPE>> =>
    httpClient.delete(`${controller}/delete/${id}`);
}

export default new RashiService();
