// Imports modules.
import { Schema, model } from "mongoose";

const comunitySchema: Schema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
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
    logo: { type: String },
    banner: { type: String },
    created_at: { type: Date, default: () => new Date },
    updated_at: { type: Date, default: () => new Date }
});

export const comunityModel = model("comunities", comunitySchema);
