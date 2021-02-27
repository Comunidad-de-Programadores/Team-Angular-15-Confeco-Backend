// Imports modules.
import { Schema, model } from "mongoose";

const comunitySchema: Schema = new Schema({});

export const comunityModel = model("comunities", comunitySchema);
