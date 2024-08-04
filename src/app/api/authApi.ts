// src/api/authApi.ts
import axios from "axios";
import qs from "qs";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
`${apiBaseUrl}/auth/profile`;
export const login = async (username: string, password: string) => {
  const response = await axios.post(
    `${apiBaseUrl}/auth/signin`,
    qs.stringify({
      username,
      password,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return response;
};
