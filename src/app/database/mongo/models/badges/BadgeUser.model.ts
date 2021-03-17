// Imports modules.
import { model, Schema } from "mongoose";
import autopopulate from "mongoose-autopopulate";

const badgeUserSchema: Schema = new Schema({
    _id: { type: String, required: true },
    userId: { type: String, required: true },
    badgeId: { type: String, required: true, ref: "badges", autopopulate: true },
    created_at: { type: String, default: () => new Date }
});

badgeUserSchema.plugin(autopopulate);

export const BadgeUserModel = model("badges_users", badgeUserSchema);
