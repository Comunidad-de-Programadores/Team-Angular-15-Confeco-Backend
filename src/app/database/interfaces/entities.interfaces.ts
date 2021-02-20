// Imports models.
import { User } from "../../models/User";
import { Workshop } from "../../models/Workshop";

export interface IUserDatabase extends User {
    password: string;
    passwordResetToken?: string;
};

export interface IWorkshopDatabase extends Workshop {};
