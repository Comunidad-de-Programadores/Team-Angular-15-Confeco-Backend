// Imports modules.
import { Schema, model } from "mongoose";

const workshopSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    workshop_time: { type: Date, required: true },
    workshop_duration: { type: Date, required: true },
    instructor: { type: Object, required: true },
    created_at: { type: Date, default: () => new Date() },
    updated_at: { type: Date, default: () => new Date() }
});

export const WorkshopModel = model("workshops", workshopSchema);
