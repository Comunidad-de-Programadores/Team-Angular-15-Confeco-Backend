// Imports models.
import { User } from "../../models/User";

export interface IUserDatabase extends User {
    password: string;
    passwordResetToken?: string;
};
