// Imports mongoose.
import { Schema, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";

const schema: Schema = new Schema({
    administrators: [{
        type: String,
        ref: "users",
        autopopulate: {
            select: {
                password: 0,
                passwordResetToken: 0
            }
        }
    }],
    event: {
        type: String,
        ref: "events",
        autopopulate: true
    }
});

schema.plugin(autopopulate);

export const EventAdministrator = model("events_administrators", schema);
