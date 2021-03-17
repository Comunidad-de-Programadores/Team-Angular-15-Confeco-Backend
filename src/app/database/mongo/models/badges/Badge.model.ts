// Imports modules.
import { model, Schema } from "mongoose";

const badgeSchema: Schema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    avatar: { type: String, required: true },
    description: { type: String, required: true },
    challenge: { type: String, required: true },
    created_at: { type: Date, default: () => new Date },
    updated_at: { type: Date, default: () => new Date }
});

export const BadgeModel = model("badges", badgeSchema);
