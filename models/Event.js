import { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {},
  { timestamps: true }
);

const Event = models.Event || model("Event", EventSchema);

export default Event;