import { Types } from "mongoose";
import { Role } from "../../../common/constants/enums";

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  lastLoginAt?: Date;
  isActive: boolean;
  role: Role;
}
