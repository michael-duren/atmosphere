export interface User {
  username: string;
  token: string;
  image?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister {
  email: string;
  password: string;
  username: string;
}
