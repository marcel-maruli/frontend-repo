export type ResponseGetUser = {
  status: number;
  message: string;
  data: User[];
};

export type User = {
  id?: number;
  name: string;
  email: string;
  age: number;
  city: string;
};
