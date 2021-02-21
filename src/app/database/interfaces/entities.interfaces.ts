// Imports models.
import { KnowledgeArea } from "../../models/KnowledgeArea";
import { User } from "../../models/User";
import { Workshop } from "../../models/Workshop";

export interface IUserDatabase extends User {
    password: string;
    passwordResetToken?: string;
};

export interface IWorkshopDatabase extends Workshop {};

export interface IKnowledgeAreaDatabase extends KnowledgeArea {}
