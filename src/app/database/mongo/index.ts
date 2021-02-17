// Imports modules.
import { connect } from "mongoose";

// Imports environments.
import { environments } from "../../config/environments";

// Imports models.
import { userModel } from "./models/user.model";
import { passwordResetModel } from "./models/passwordResets.model";

connect(environments.MONGODB_URI as string, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("🔥 Connection to the database successfully"))
.catch(console.error);

export const models = {
    User: userModel,
    PasswordReset: passwordResetModel
};
