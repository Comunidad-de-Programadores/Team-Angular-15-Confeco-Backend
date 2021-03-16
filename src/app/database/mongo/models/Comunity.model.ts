// Imports models.
import { Schema, model } from "mongoose";

const comunitySchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    banner: { type: String },
    created_at: { type: Date, default: () => new Date },
    updated_at: { type: Date, default: () => new Date }
});

export const ComunityModel = model("comunities", comunitySchema);
