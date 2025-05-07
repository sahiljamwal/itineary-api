import { Model, model, Schema } from "mongoose";
import {
  IActivity,
  IItineary,
  IShareable,
} from "../types/models/itineararies.type";

const activitySchema = new Schema<IActivity>(
  {
    time: { type: Date, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
  },
  { _id: false }
);

const shareableSchema = new Schema<IShareable>(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    visits: { type: Number, default: 0 },
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
    shareable: shareableSchema,
  },
  { timestamps: true }
);

schema.index({ userId: 1, createdAt: -1 });
schema.index({ destination: 1 }, { collation: { locale: "en", strength: 2 } });
schema.index({
  userId: 1,
  destination: 1,
  createdAt: -1,
  startDate: -1,
  title: -1,
});
schema.index({ "shareable.id": 1 });

const ItineraryModel = model<IItineary, Model<IItineary>>(
  "Itineary",
  schema,
  "itineraries"
);
export default ItineraryModel;
