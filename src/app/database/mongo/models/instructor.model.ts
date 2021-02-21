// Imports modules
import { Schema, model } from "mongoose";

const instructorSchema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    profession: { type: String },
    social_medial: { type: String, required: true },
    picture: { type: String },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }
});

export const instructorModel = model("instructors", instructorSchema);
