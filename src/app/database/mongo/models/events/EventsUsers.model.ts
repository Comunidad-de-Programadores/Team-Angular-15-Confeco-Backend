//Imports modules.
import { Schema, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";

const schema: Schema = new Schema({
    user: {
        type: String,
        ref: "users",
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
