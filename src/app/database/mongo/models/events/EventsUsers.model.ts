//Imports modules.
import { Schema, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";

const schema: Schema = new Schema({
    _id: { type: String, required: true },
    user: {
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
    eventId: { type: String, required: true }
});

schema.plugin(autopopulate);

export const EventUser = model("events_users", schema);
