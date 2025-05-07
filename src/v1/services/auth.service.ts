import { EC } from "../../common/constants/errors";
import { BaseError } from "../../common/errors/base.error";
import {
  AuthenticationError,
  SystemError,
} from "../../common/errors/custom.error";
import bcryptUtil from "../../common/utils/bcrypt.util";
import jwtUtil from "../../common/utils/jwt.util";
import UserModel from "../schema/users.schema";
import { ILoginUserPayload, IRegisterUserPayload } from "../types/auth.type";

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
      return await this._model.create(payload);
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

      const token = jwtUtil.generateToken({
        userId: user._id.toString(),
        name: user.name,
        role: user.role,
        email: user.email,
      });

      return { accessToken: token };
    } catch (error) {
      return this._handleError(error as Error);
    }
  };
}

export default new AuthService();
