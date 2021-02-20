// Imports modules.
import { Schema, model } from "mongoose";

const workshopSchema = new Schema({});

export const WorkshopModel = model("workshops", workshopSchema);
