// Imports modules.
import { Schema, model } from "mongoose";
import { v4 as uuid } from "uuid";

const userSchema: Schema = new Schema({
    _id: { type: String, default: uuid() },
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String },
    country: { type: String },
    birthday: { type: Date },
    facebookLink: { type: String },
    twitterLink: { type: String },
    githubLink: { type: String },
    linkedinLink: { type: String },
    avatar: { type: String },
    banner: { type: String },
    verified_email: { type: Boolean, default: false },
    password: { type: String, default: undefined },
    biography: { type: String },
    knowledgeAreas: { type: Array },
    passwordResetToken: { type: String, defaul: undefined },
    created_at: { type: Date, default: () => new Date },
    updated_at: { type: Date, default: () => new Date }
});

export const UserModel = model("users", userSchema);
