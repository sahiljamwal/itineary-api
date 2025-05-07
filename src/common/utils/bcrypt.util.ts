import bcrypt from "bcrypt";

class Bcrypt {
  private rounds = 10;
  constructor() {}

  public createHash = async (plainPassword: string) => {
    const salt = await bcrypt.genSalt(this.rounds);
    return await bcrypt.hash(plainPassword, salt);
  };

  public compare = async (plainPassword: string, hashedPassword: string) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
  };
}

export default new Bcrypt();
