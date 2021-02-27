// Imports modules.
import { Schema, model } from "mongoose";

const insigniaSchema: Schema = new Schema({
    _id: { type: String, required: true },
    title: { title: String, required: true },
    subtitle: { title: String },
    description: { title: String, required: true },
    logo: { type: String },
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
    created_at: { type: Date, default: () => new Date },
    updated_at: { type: Date, default: () => new Date }
});

export const insigniaModel = model("events", insigniaSchema);
