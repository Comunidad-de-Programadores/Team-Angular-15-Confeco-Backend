// Imports modules.
import { connect } from "mongoose";

// Imports environments.
import { environments } from "../../config/environments";

// Imports models.
import { userModel } from "./models/user.model";

connect(environments.MONGODB_URI as string)
.then(() => console.log("Connection to the database successfully"))
.catch(console.error);

export const models = {
    User: userModel
};
