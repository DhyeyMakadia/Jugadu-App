import { AxiosResponse } from "axios";
import httpClient from "../httpClient";
import { LoginRequest, LoginResponse, SignUpRequest, SignUpResponse } from "../types/auth";

const controller = "user"

class AuthService {
  signIn = async (
    signInRequest: LoginRequest
  ): Promise<AxiosResponse<LoginResponse>> =>
    httpClient.post(`${controller}/login`, signInRequest);

  signUp = async (
    signUpRequest: SignUpRequest
  ): Promise<AxiosResponse<SignUpResponse>> =>
    httpClient.post(`${controller}/signup`, signUpRequest);
}

export default new AuthService();