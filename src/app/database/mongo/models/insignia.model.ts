// Imports modules.
import { Schema, model } from "mongoose";

const insigniaSchema: Schema = new Schema({});

export const insigniaModel = model("events", insigniaSchema);
