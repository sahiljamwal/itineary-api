import configuration from "../../v1/configurations/config";
import jwt from "jsonwebtoken";

class Jwt {
  constructor(private _secret = configuration.jwtSecret) {}

  public generateToken = (payload: any) => {
    return jwt.sign(payload, this._secret, { expiresIn: "1h" });
  };

  public verifyToken = (token: string) => {
    return jwt.verify(token, this._secret);
  };
}

export default new Jwt();
