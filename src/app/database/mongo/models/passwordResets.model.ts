// Imports modules.
import { Schema, model } from "mongoose";

const passwordResetsSchema = new Schema({
    _id: { type: String, required: true },
    email: { type: String, required: true },
    token: { type: String, required: true },
    created_at: { type: Number, default: Date.now() }
});

export const passwordResetModel = model("password_resets", passwordResetsSchema);
