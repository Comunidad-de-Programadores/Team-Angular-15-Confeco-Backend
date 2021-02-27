// Imports modules.
import { Schema, model } from "mongoose";

const eventSchema: Schema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    logo: { type: String },
    banner: { type: String },
    members: [{
        type: String,
        ref: "users",
        autopopulate: {
            select: {
                password: 0,
                passwordResetToken: 0
            }
        }
    }],
    expedition_date: { type: Date, required: true },
    expiration_date: { type: Date, required: true },
    created_at: { type: String, default: () => new Date },
    updated_at: { type: String, default: () => new Date }
});

export const eventModel = model("events", eventSchema);
