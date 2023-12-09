export type DEFAULT_RESPONSE_TYPE = {
  success: boolean;
  message: string;
};

export type LoginRequest = {
  mobile_number: string;
  password: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    authToken: string;
    refreshToken: string;
    id: number;
    is_admin: number;
    name: string;
  };
};

export type SignUpRequest = {
  name: string;
  mobile_number: string;
  email: string;
  password: string;
};

export type SignUpResponse = DEFAULT_RESPONSE_TYPE;
