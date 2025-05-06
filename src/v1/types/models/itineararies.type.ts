import { Types } from "mongoose";

export interface IItineary {
  userId: Types.ObjectId;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  activities: IActivity[];
}

export interface IActivity {
  time: Date;
  description: string;
  location: string;
}
