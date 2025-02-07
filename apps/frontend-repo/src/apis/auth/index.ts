import { AuthTypes } from "@repo/shared-types/types";
import axiosInstance from "../httpServices";
import { ResponseRegister } from "./models/register";
import { ResponseLogin } from "./models/login";


type TPayloadRegister = AuthTypes.AuthData;

type TPayloadLogin = Omit<AuthTypes.AuthData, "age" | "city">;

export const useLogin = async (payload: TPayloadLogin) => {
  try {
    const response = await axiosInstance.post<ResponseLogin>(`/login`, payload);

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const useRegister = async (payload: TPayloadRegister) => {
  try {
    const response = await axiosInstance.post<ResponseRegister>(
      `/users/add-user-data`,
      payload
    );

    return response.data;
  } catch (error) {
    console.error("Register failed:", error);
    throw error;
  }
};
