// Imports modules.
import { model, Schema } from "mongoose";

const eventSchema: Schema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    members: [{ type: String }],
    banned: [{ type: String }],
    banner: { type: String, required: true },
    description: { type: String, required: true },
    created_at: { type: Date, default: () => new Date },
    updated_at: { type: Date, default: () => new Date }
});

export const EventModel = model("events", eventSchema);
