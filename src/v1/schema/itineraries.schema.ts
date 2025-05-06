import { Model, model, Schema } from "mongoose";
import { IItineary } from "../types/models/itineararies.type";

const schema = new Schema<IItineary>({}, { timestamps: true });

const UsersRepository = model<IItineary, Model<IItineary>>(
  "Itineary",
  schema,
  "itineraries"
);
export default UsersRepository;
