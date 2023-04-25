import axios from "@/lib/axios";

export type RefreshTokenResponse = {
  accessToken: string;
};

export const refreshTokenApi = (authToken: string) => {
  return axios
    .post<RefreshTokenResponse>("/token", { authToken })
    .then((res) => {
      const { accessToken } = res.data;

      return {
        accessToken,
      };
    });
};
