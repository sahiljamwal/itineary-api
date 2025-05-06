import { Model, model, Schema } from "mongoose";
import { IUser } from "../types/models/user.type";
import { Role } from "../../common/constants/enums";

const schema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: Role, default: Role.USER },
  },
  { timestamps: true }
);

const UserModel = model<IUser, Model<IUser>>("User", schema, "users");
export default UserModel;
