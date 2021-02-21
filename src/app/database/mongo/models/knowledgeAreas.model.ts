// Imports modules.
import { Schema, model } from "mongoose";

const knowledgeAreaSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    workshops: [{ type: String, ref: "workshops", autopopulate: true }],
    banner: { type: String },
    profile_picture: { type: String },
    created_at: { type: Date, default: new Date() },
    updated_at: { type: Date, default: new Date() }
});

export const knowledgeAreaModel = model("knowledge_areas", knowledgeAreaSchema);
