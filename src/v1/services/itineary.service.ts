import { Types } from "mongoose";
import { EC } from "../../common/constants/errors";
import { BaseError } from "../../common/errors/base.error";
import {
  AuthorizationError,
  NotFoundError,
  SystemError,
} from "../../common/errors/custom.error";
import ItineraryModel from "../schema/itineraries.schema";
import {
  ICreateItinearyPayload,
  IFetchItineary,
  IUpdateItinearyPayload,
} from "../types/itineary.type";
import { IItineary } from "../types/models/itineararies.type";
import { IUser } from "../types/models/user.type";
import { getPaginationQuery } from "../helpers/query.helper";
import { PaginationqueryCodes } from "../../common/constants/enums";
import { cloneDeep } from "lodash";
import { IPaginationResponse } from "../types/pagination.type";

class ItinearyService {
  constructor(private _model = ItineraryModel) {}

  private _handleError = (error: Error) => {
    if (error instanceof BaseError) {
      throw error;
    } else {
      throw new SystemError(EC.ERROR_IN_API);
    }
  };

  public create = async (payload: ICreateItinearyPayload, user: IUser) => {
    try {
      const { _id: userId } = user;
      return await this._model.create({ ...payload, userId });
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public get = async (
    query: IFetchItineary["query"],
    user: IUser
  ): Promise<IPaginationResponse<IItineary>> => {
    try {
      const meta = getPaginationQuery<IItineary>(
        PaginationqueryCodes.ITINEARARIES_PAGINATION,
        { query: cloneDeep(query), body: cloneDeep(user) }
      );

      const [itineararies, total] = await Promise.all([
        this._model
          .find(meta.query, meta.projection ?? {})
          .sort(meta.sort)
          .skip((meta.skip - 1) * meta.limit)
          .limit(meta.limit)
          .lean(),
        this._model.countDocuments(meta.query),
      ]);

      return {
        meta: { total },
        data: itineararies,
      };
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public getById = async (itinearyId: string, user: IUser) => {
    try {
      const { _id: userId } = user;

      const itineary = await this._model
        .findOne({ _id: itinearyId }, { __v: 0 })
        .lean();

      this._checkItineary(itineary as IItineary, userId);

      return itineary;
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public update = async (
    itinearyId: string,
    payload: IUpdateItinearyPayload,
    user: IUser
  ) => {
    try {
      const { _id: userId } = user;

      const itineary = await this._model.findOne({ _id: itinearyId }).lean();

      this._checkItineary(itineary as IItineary, userId);

      await this._model.findOneAndUpdate(
        { _id: itinearyId },
        { $set: { ...payload } }
      );

      return payload;
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  public delete = async (itinearyId: string, user: IUser) => {
    try {
      const { _id: userId } = user;

      const itineary = await this._model.findOne({ _id: itinearyId }).lean();

      this._checkItineary(itineary as IItineary, userId);

      await this._model.deleteOne({ _id: itinearyId });

      return;
    } catch (error) {
      return this._handleError(error as Error);
    }
  };

  private _checkItineary = (itineary: IItineary, userId: Types.ObjectId) => {
    if (!itineary) {
      throw new NotFoundError(EC.ITINEARY_NOT_FOUND);
    }

    if (itineary.userId.toString() !== userId.toString()) {
      throw new AuthorizationError(EC.UNAUTHORIZED_ACCESS);
    }
  };
}

export default new ItinearyService();
