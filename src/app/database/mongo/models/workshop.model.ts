// Imports modules.
import { Schema, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";

const workshopSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    workshop_time: { type: Date, required: true },
    workshop_duration: { type: Date, required: true },
    knowledgeAreas: [{ type: String, autopopulate: true }],
    instructor: {
        type: String,
        ref: "users",
        required: true,
        autopopulate: {
            select: {
                password: 0,
                passwordResetToken: 0
            }
        }
    },
    created_at: { type: Date, default: () => new Date() },
    updated_at: { type: Date, default: () => new Date() }
});

workshopSchema.plugin(autopopulate);

export const WorkshopModel = model("workshops", workshopSchema);
