// Imports mongoose.
import { model, Schema } from "mongoose";
import autopopulate from "mongoose-autopopulate";

const workshopSchema: Schema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    picture: { type: String },
    instructor: { type: String, required: true, ref: "content_creators", autopopulate: true },
    knowledgeArea: { type: String, required: true, ref: "knowledgeareas", autopopulate: true },
    workshopTime: { type: Date, required: true },
    workshopsEndTime: { type: Date, required: true },
    created_at: { type: Date, default: () => new Date },
    updated_at: { type: Date, default: () => new Date }
});

workshopSchema.plugin(autopopulate);

export const WorkshopModel = model("workshops", workshopSchema);
