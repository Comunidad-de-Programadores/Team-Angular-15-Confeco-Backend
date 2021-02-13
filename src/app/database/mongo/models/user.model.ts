// Imports modules.
import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const userSchema: Schema = new Schema({
    _id: { type: String, default: uuid() },
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    provider: { type: String, default: "Team-Angular-15" },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: Date.now() }
});

export const userModel = model("users", userSchema);
