import { EC } from "../../common/constants/errors";
import { BaseError } from "../../common/errors/base.error";
import {
  AuthenticationError,
  SystemError,
  ValidationError,
} from "../../common/errors/custom.error";
import bcryptUtil from "../../common/utils/bcrypt.util";
import jwtUtil from "../../common/utils/jwt.util";
import UserModel from "../schema/users.schema";
import { ILoginUserPayload, IRegisterUserPayload } from "../types/auth.type";
import { IUser } from "../types/models/user.type";

class AuthService {
  constructor(private _model = UserModel) {}

  private _handleError = (error: Error) => {
    if (error instanceof BaseError) {
      throw error;
    } else {
      throw new SystemError(EC.ERROR_IN_API);
    }
  };

  public registerUser = async (payload: IRegisterUserPayload) => {
    try {
      const { email } = payload;
      const user = await this._model.findOne({ email }).lean();

      if (user) {
        throw new ValidationError(EC.USER_ALREADY_REGISTERED);
      }

      const newUser = await this._model.create(payload);
      const { accessToken, expiresIn } = this._getAccessToken(newUser);

      return { email, _id: newUser._id, accessToken, expiresIn };
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public loginUser = async (payload: ILoginUserPayload) => {
    try {
      const { email, password } = payload;
      const user = await this._model.findOne({ email }).lean();

      if (!user || !(await bcryptUtil.compare(password, user.password))) {
        throw new AuthenticationError(EC.INVALID_CREDENTIALS);
      }

      const { accessToken, expiresIn } = this._getAccessToken(user);

      return { accessToken, expiresIn };
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public findUser = async (userId: string) => {
    try {
      return await this._model.findOne({ _id: userId }).lean();
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  private _getAccessToken = (user: IUser) => {
    const token = jwtUtil.generateToken({
      userId: user._id.toString(),
      name: user.name,
      role: user.role,
      email: user.email,
    });

    return { accessToken: token, expiresIn: 3600 };
  };
}

export default new AuthService();
