export interface User {
  username: string;
  token: string;
  image?: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  username?: string;
}
