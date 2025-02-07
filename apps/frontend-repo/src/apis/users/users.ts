import { ResponseRegister } from "../auth/models/register";
import axiosInstance from "../httpServices";
import { ResponseGetUser } from "./models/users";
import { AuthTypes } from "@repo/shared-types/types";

type TPayloadRegister = AuthTypes.AuthData;

export const useGetAllUser = async () => {
  try {
    const response = await axiosInstance.get<ResponseGetUser>(
      `/users/fetch-user-data`
    );

    return response.data;
  } catch (error) {
    console.error("Register failed:", error);
    throw error;
  }
};

export const useEditUser = async (payload: TPayloadRegister, params: string) => {
  try {
    const response = await axiosInstance.put<ResponseRegister>(
      `/users/update-user-data/${params}`,
      payload
    );


    return response.data;
  } catch (error) {
    console.error("Register failed:", error);
    throw error;
  }
};
