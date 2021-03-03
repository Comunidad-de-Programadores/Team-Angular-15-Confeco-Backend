// Imports modules.
import { connect } from "mongoose";

// Imports environments.
import { environments } from "../../config/environments";

// Imports models.
import { UserModel } from "./models/user.model";
import { WorkshopModel } from "./models/workshop.model";
import { knowledgeAreaModel } from "./models/knowledgeArea.model";
import { eventModel } from "./models/event.model";

connect(environments.MONGODB_URI as string, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("🔥 Connection to the database successfully"))
.catch(console.error);

export const models = {
    User: UserModel,
    Workshop: WorkshopModel,
    Knowledge: knowledgeAreaModel,
    Event: eventModel
};
