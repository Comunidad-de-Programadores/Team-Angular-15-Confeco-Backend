// Imports modules.
import { connect } from "mongoose";

// Imports environments.
import { environments } from "../../config/environments";

// Imports models.
import { UserModel } from "./models/user.model";
import { WorkshopModel } from "./models/workshop.model";
import { KnowledgeAreaModel } from "./models/knowledgeArea.model";
import { ContentCreatorModel } from "./models/ContentCreator.model";
import { ComunityModel } from "./models/Comunity.model";
import { BadgeModel } from "./models/badges/Badge.model";
import { BadgeUserModel } from "./models/badges/BadgeUser.model";
import { GroupModel } from "./models/Group.model";

connect(environments.MONGODB_URI as string, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("🔥 Connection to the database successfully"))
.catch(console.error);

export const models = {
    User: UserModel,
    KnowledgeArea: KnowledgeAreaModel,
    Workshop: WorkshopModel,
    ContentCreator: ContentCreatorModel,
    Comunity: ComunityModel,
    Badge: BadgeModel,
    BadgeUser: BadgeUserModel,
    Group: GroupModel
};
