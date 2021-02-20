// Imports modules.
import { Schema, model } from "mongoose";

const knowledgeAreaSchema = new Schema({});

export const knowledgeAreaModel = model("knowledge_areas", knowledgeAreaSchema);
