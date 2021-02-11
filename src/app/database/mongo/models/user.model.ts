// Imports modules.
import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema({
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified_email: { type: Boolean, default: false },
    provider: { type: String, default: "Team-Angular-15" },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: Date.now() }
});

export const userModel = model("users", userSchema);
