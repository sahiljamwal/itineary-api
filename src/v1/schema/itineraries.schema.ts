import { Model, model, Schema } from "mongoose";
import { IActivity, IItineary } from "../types/models/itineararies.type";

const activitySchema = new Schema<IActivity>(
  {
    time: { type: Date, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
  },
  { _id: false }
);

const schema = new Schema<IItineary>(
  {
    title: { type: String, required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    activities: [activitySchema],
  },
  { timestamps: true }
);

const ItineraryModel = model<IItineary, Model<IItineary>>(
  "Itineary",
  schema,
  "itineraries"
);
export default ItineraryModel;
