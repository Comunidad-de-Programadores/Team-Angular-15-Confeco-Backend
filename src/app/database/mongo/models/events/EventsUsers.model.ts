//Imports modules.
import { Schema, model } from "mongoose";

const schema: Schema = new Schema({
    _id: { type: String, required: true },
    user: { type: String, ref: "users", required: true, },
    event: { type: String, ref: "events", required: true }
});

export const EventUser = model("events_users", schema);
