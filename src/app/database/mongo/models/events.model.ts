// Imports modules.
import { Schema, model } from "mongoose";

const eventSchema: Schema = new Schema({});

export const eventModel = model("events", eventSchema);
