import { AxiosResponse } from 'axios';
import httpClient from '../httpClient';
import {
  DEFAULT_RESPONSE_TYPE} from '../types/auth';
import { ChangePasswordRequest, MyProfileResponse, ReferralListResponse, UsersResponse } from '../types/users';

const controller = 'user';

class UserService {
  GetAllUsers = async (): Promise<AxiosResponse<UsersResponse>> =>
    httpClient.get(`${controller}/readAll`);

  ProfileDetails = async (): Promise<AxiosResponse<MyProfileResponse>> =>
    httpClient.get(`${controller}/readMyProfile`);

  GetReferralDetails = async (): Promise<AxiosResponse<ReferralListResponse>> =>
    httpClient.get(`${controller}/referralUsers/listing`);

  UpdateUserStatus = async (
    id: number,
    payload: { status: number }
  ): Promise<AxiosResponse<DEFAULT_RESPONSE_TYPE>> =>
    httpClient.put(`${controller}/update/${id}`, payload);

  ChangePassword = async (
    payload: ChangePasswordRequest
  ): Promise<AxiosResponse<DEFAULT_RESPONSE_TYPE>> =>
    httpClient.post(`${controller}/newPassword`, payload);
}

export default new UserService();
