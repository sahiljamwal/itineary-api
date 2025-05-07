import { IItineary } from "./models/itineararies.type";

export interface ICreateItinearyPayload extends Omit<IItineary, "userId"> {}

export interface IUpdateItinearyPayload extends ICreateItinearyPayload {}

export type IFetchItineary = {
  params: { id: string };
  query: {
    page: number;
    limit: number;
    sort: { createdAt: 1 | -1; startDate: 1 | -1; title: 1 | -1 };
    filter: { destination: string };
  };
};

export type IFetchShareableItineary = {
  params: { shareableId: string };
};
