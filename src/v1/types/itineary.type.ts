import { IItineary } from "./models/itineararies.type";

export interface ICreateItinearyPayload extends Omit<IItineary, "userId"> {}

export interface IUpdateItinearyPayload extends ICreateItinearyPayload {}

export type IFetchItineary = {
  params: { id: string };
  query: {};
};
