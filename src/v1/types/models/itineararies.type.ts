export interface IItineary {
  userId: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  activities: IActivity[];
}

export interface IActivity {
  time: string;
  description: string;
  location: string;
}
