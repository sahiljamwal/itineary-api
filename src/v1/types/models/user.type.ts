import { Role } from "../../../common/constants/enums";

export interface IUser {
  name: string;
  email: string;
  password: string;
  lastLoginAt?: Date;
  isActive: boolean;
  role: Role;
}
