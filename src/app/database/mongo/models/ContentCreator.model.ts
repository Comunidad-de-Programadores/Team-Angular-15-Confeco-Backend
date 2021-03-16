// Imports modules.
import { model, Schema } from "mongoose";

const contentCreatorSchema: Schema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    profession: { type: String },
    avatar: { type: String },
    socialMedia: { type: String, required: true },
    created_at: { type: Date, default: () => new Date },
    updated_at: { type: Date, default: () => new Date }
});

export const ContentCreatorModel = model("content_creators", contentCreatorSchema);
