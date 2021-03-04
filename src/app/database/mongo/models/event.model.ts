// Imports modules.
import { Schema, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";

const eventSchema: Schema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    logo: { type: String },
    banner: { type: String },
    owner: {
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
    administrators: [{
        type: String,
        ref: "users",
        autopopulate: {
            select: {
                password: 0,
                passwordResetToken: 0
            }
        }        
    }],
    users: [{
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

eventSchema.plugin(autopopulate);

export const eventModel = model("events", eventSchema);
