import { EC } from "../../common/constants/errors";
import { BaseError } from "../../common/errors/base.error";
import { SystemError } from "../../common/errors/custom.error";

class ItinearyService {
  constructor() {}

  private _handleError = (error: Error) => {
    if (error instanceof BaseError) {
      throw error;
    } else {
      throw new SystemError(EC.ERROR_IN_API);
    }
  };

  public create = () => {
    try {
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public get = () => {
    try {
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public getById = () => {
    try {
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public update = () => {
    try {
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public delete = () => {
    try {
    } catch (error) {
      return this._handleError(error as Error);
    }
  };
}

export default new ItinearyService();
