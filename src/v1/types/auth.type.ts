export interface IRegisterUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUserPayload extends Omit<IRegisterUserPayload, "name"> {}
