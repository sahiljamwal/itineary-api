import { FilterQuery, ProjectionType } from "mongoose";

export interface IPaginationResponse<T> {
  meta: {
    total: number;
  };
  data: T[];
}

export type IPaginationMeta<T> = {
  limit: number;
  skip: number;
  sort: { [key: string]: 1 | -1 };
  query: FilterQuery<T>;
  projection: ProjectionType<T>;
};
