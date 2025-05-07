import { Types } from "mongoose";

export interface IItineary {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  activities: IActivity[];
  shareable?: IShareable;
}

export interface IActivity {
  time: Date;
  description: string;
  location: string;
}

export interface IShareable {
  id: Types.ObjectId;
  createdAt: Date;
  visits: number;
}
