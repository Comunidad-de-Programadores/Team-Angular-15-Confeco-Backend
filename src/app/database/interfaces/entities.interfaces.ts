// Imports models.
import { Event } from "../../models/Event";
import { EventUser } from "../../models/events/EventUser";
import { KnowledgeArea } from "../../models/KnowledgeArea";
import { User } from "../../models/User";
import { Workshop } from "../../models/Workshop";

export interface IUserDatabase extends User {
    password: string;
    passwordResetToken?: string;
};

export interface userFieldsUpdate {
    nickname?: string;
    gender?: string;
    country?: string;
    facebookLink?: string;
    twitterLink?: string;
    githubLink?: string;
    biography?: string;
    knowledgeAreas?: string[];
    linkedinLink?: string;
}

export interface IWorkshopDatabase extends Workshop {};

export interface IKnowledgeAreaDatabase extends KnowledgeArea {}

export interface IEventDatabase extends Event {}

export interface IEventUserDatabase extends EventUser {}
