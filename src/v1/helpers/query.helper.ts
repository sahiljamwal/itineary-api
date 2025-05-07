import { PaginationqueryCodes } from "../../common/constants/enums";
import { EC } from "../../common/constants/errors";
import { ValidationError } from "../../common/errors/custom.error";
import { IFetchItineary } from "../types/itineary.type";
import { IItineary } from "../types/models/itineararies.type";
import { IUser } from "../types/models/user.type";
import { IPaginationMeta } from "../types/pagination.type";
import { IQueryHelperData } from "../types/query.type";

export const getPaginationQuery = <T>(
  code: PaginationqueryCodes,
  queryHelperMetaData: IQueryHelperData
): IPaginationMeta<T> => {
  switch (code) {
    case PaginationqueryCodes.ITINEARARIES_PAGINATION: {
      const {
        filter: { destination },
        limit,
        page,
        sort,
      } = queryHelperMetaData.query as IFetchItineary["query"];

      const { _id: userId } = queryHelperMetaData.body as IUser;

      return {
        limit,
        skip: page,
        sort: {
          ...(Object.keys(sort ?? {}).length ? sort : { createdAt: -1 }),
        },
        query: {
          userId,
          ...(destination
            ? { destination: { $regex: destination, $options: "i" } }
            : null),
        },
        projection: {
          __v: 0,
        },
      } as IPaginationMeta<IItineary>;
    }
    default:
      throw new ValidationError(EC.UNSUPPORTED_PAGINATION_QUERY_CODE_PROVIDED);
  }
};
