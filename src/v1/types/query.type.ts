import { FilterQuery, ProjectionType } from "mongoose";

export type IQueryHelperData = {
  query?: unknown;
  params?: unknown;
  body?: unknown;
};

export type IQueryMeta<T> = {
  query: FilterQuery<T>;
  projection: ProjectionType<T>;
};
