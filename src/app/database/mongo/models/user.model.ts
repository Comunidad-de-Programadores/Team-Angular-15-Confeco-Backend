// Imports modules.
import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const userSchema: Schema = new Schema({
    _id: { type: String, default: uuid() },
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, default: undefined },
    verified_email: { type: Boolean, default: false },
    passwordResetToken: { type: String, defaul: undefined },
    created_at: { type: Number, default: () => new Date() },
    updated_at: { type: Number, default: () => new Date() }
});

export const UserModel = model("users", userSchema);
