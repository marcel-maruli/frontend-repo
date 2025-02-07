export type ResponseRegister = {
  status: number;
  message: string;
  data: Data;
  isSuccess: boolean;
};

export type Data = {
  name: string;
  email: string;
  age: number;
  city: string;
  password: string;
};
