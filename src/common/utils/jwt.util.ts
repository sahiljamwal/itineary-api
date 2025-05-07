import configuration from "../../v1/configurations/config";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: string;
  name: string;
  role: string;
  email: string;
}

class Jwt {
  constructor(private _secret = configuration.jwtSecret) {}

  public generateToken = (payload: JwtPayload) => {
    return jwt.sign(payload, this._secret, { expiresIn: "1h" });
  };

  public verifyToken = (token: string) => {
    return jwt.verify(token, this._secret);
  };
}

export default new Jwt();
