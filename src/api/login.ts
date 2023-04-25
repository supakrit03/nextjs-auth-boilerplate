import axios from "@/lib/axios";

export type UserResponse = {
  id: string;
  firstName: string;
  lastName: string;
  dob: Date;
  favAnime: string[];
  username: string;
  password: string;
};

export type LoginResponse = {
  authToken: string;
  accessToken: string;
  user: UserResponse;
};

export type Credentials = {
  username: string;
  password: string;
};

export const loginApi = (credentials: Credentials) => {
  return axios.post<LoginResponse>("/login", credentials).then((res) => {
    const { accessToken, authToken, user } = res.data;

    return {
      accessToken,
      userId: user.id,
      authToken,
    };
  });
};
