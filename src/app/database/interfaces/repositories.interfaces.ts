// Imports interfaces.
import { IEventDatabase, IEventUserDatabase, IKnowledgeAreaDatabase, IUserDatabase, IWorkshopDatabase, userFieldsUpdate } from "./entities.interfaces";

export interface IOptionsList {
    skip?: number;
    limit?: number;
};

interface Update<Tval> {
    update(id: string, value: Tval): Promise<void>;
}

interface Get<Tval> {
    get(id: string): Promise<Tval | null>;
}

interface Create<Tval> {
    create(data: Tval): Promise<void>;
}

interface Delete {
    delete(id: string): Promise<void>;
}

interface UserRepository 
extends Create<IUserDatabase>,
Update<userFieldsUpdate>,
Get<IUserDatabase>,
Delete {}

export interface IRepository<Tval> {
    create(entity: Tval): Promise<void>;
    get(id: string): Promise<Tval | null>;
    update(id: string, data: Tval): Promise<void>;
    list(options: IOptionsList): Promise<Tval[]>;
    delete(id: string): Promise<void>;
};

export interface IDatabaseUserRepository extends UserRepository {
    getByEmail(email: string): Promise<IUserDatabase | null>;
    updateStatusEmail(id: string, status: boolean): Promise<void>;
    updatePassword(email: string, password: string): Promise<void>;
    updatePasswordResetToken(id: string, token: string | undefined): Promise<void>;
    updateAvatar(id: string, avatar: string): Promise<void>;
    convertInstructor(id: string, instructor: object): Promise<void>;
};

export interface IKnowledgeAreaRepository extends IRepository<IKnowledgeAreaDatabase> {
    insertWorkshop(id: string, workshop_id: string): Promise<void>;
}

export interface IWorkshopRepository extends IRepository<IWorkshopDatabase> {
    getByInstructor(user_id: string): Promise<IWorkshopDatabase[]>;
    getByInstructorAndId(userId: string, workshopId: string): Promise<IWorkshopDatabase | null>
}

export interface IEventRepository extends IRepository<IEventDatabase> {}

export interface IEventUserRepository extends IRepository<IEventUserDatabase> {
    getUsersByEvent(eventId: string, options: IOptionsList): Promise<IUserDatabase[]>;
    getUserByEvent(userId: string, eventId: string): Promise<IEventUserDatabase | null>;
}
