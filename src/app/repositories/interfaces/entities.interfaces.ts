// Imports models.
import { User } from "../../models/User";

export interface UserDatabase extends User {
    password: string;
    passwordResetToken?: string;
}

export interface UserUpdateableParams {
    nickname: string;
    country?: string;
    gender?: string;
    biography?: string;
    birthday?: Date;
    knowledgeAreas?: string[];
    facebookLink?: string;
    twitterLink?: string;
    githubLink?: string;
    linkedinLink?: string;
}

export interface BasicUpdateParams<Tval> {
    key: string;
    value: Tval;
}
