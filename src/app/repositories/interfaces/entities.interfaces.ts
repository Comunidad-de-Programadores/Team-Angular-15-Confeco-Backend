// Imports models.
import { User } from "../../models/User";

export interface UserDatabase extends User {
    password: string;
    passwordResetToken?: string;
}

export interface BasicUpdateParams<Tval> {
    key: string;
    value: Tval;
}
