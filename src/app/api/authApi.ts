// src/api/authApi.ts
import axios from "axios";
import qs from "qs";

export const login = async (username: string, password: string) => {
  const response = await axios.post(
    "http://localhost:8000/api/auth/signin",
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
