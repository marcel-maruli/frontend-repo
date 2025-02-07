export interface ResponseLogin {
  status: number;
  authorizedData: AuthorizedData;
  token: string;
  message: string;
}

export interface AuthorizedData {
  user: User;
}

export interface User {
  name: string;
  email: string;
  age: number;
  city: string;
}
