// Imports modules.
import { Schema, model } from "mongoose";

const knowledgeAreaSchema: Schema = new Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true }
});

export const KnowledgeAreaModel = model("knowledgeareas", knowledgeAreaSchema);
