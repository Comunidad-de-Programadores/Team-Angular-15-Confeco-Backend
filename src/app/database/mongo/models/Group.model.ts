// Imports modules.
import { model, Schema } from "mongoose";
import autopopulate from "mongoose-autopopulate";

const groupSchema: Schema = new Schema({
    _id: { type: String, required: true },
    banner: { type: String, required: true },
    name: { type: String, required: true },
    tag: { type: Object, required: true },
    description: { type: String },
    members: [{
        type: String,
        ref: "users",
        autopopulate: { select: "nickname avatar email" }
    }],
    created_at: { type: Date, default: () => new Date },
    updated_at: { type: Date, default: () => new Date }
});

groupSchema.plugin(autopopulate);

export const GroupModel = model("groups", groupSchema);
