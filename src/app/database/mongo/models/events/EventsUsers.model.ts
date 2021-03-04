//Imports modules.
import { Schema, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";

const schema: Schema = new Schema({
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
    event: { type: String, ref: "events" }
});

schema.plugin(autopopulate);

export const EventUser = model("events_users", schema);
