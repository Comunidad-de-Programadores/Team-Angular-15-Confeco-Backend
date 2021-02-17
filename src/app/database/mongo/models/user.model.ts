// Imports modules.
import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const userSchema: Schema = new Schema({
    _id: { type: String, default: uuid() },
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, default: undefined },
    verified_email: { type: Boolean, default: false },
    created_at: { type: Number, default: Date.now() },
    updated_at: { type: Number, default: Date.now() }
});

export const userModel = model("users", userSchema);
