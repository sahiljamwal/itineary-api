import { Model, model, Schema } from "mongoose";
import { IUser } from "../types/models/user.type";
import { Role } from "../../common/constants/enums";
import bcryptUtil from "../../common/utils/bcrypt.util";

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

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcryptUtil.createHash(this.password);
    return next();
  } catch (err) {
    return next(err as Error);
  }
});

const UserModel = model<IUser, Model<IUser>>("User", schema, "users");
export default UserModel;
