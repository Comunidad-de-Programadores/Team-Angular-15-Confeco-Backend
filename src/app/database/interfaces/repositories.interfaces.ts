// Imports interfaces.
import { IEventDatabase, IKnowledgeAreaDatabase, IUserDatabase, IWorkshopDatabase } from "./entities.interfaces";

export interface IOptionsList {
    skip?: number;
    limit?: number;
};

export interface IRepository<Tval> {
    create(entity: Tval): Promise<void>;
    get(id: string): Promise<Tval | null>;
    update(id: string, data: Tval): Promise<void>;
    list(options: IOptionsList): Promise<Tval[]>;
    delete(id: string): Promise<void>;
};

export interface IDatabaseUserRepository extends IRepository<IUserDatabase> {
    getByEmail(email: string): Promise<IUserDatabase | null>;
    updateStatusEmail(id: string, status: boolean): Promise<void>;
    updatePassword(email: string, password: string): Promise<void>;
    updatePasswordResetToken(id: string, token: string | undefined): Promise<void>;
};

export interface IKnowledgeAreaRepository extends IRepository<IKnowledgeAreaDatabase> {
    insertWorkshop(id: string, workshop_id: string): Promise<void>;
}

export interface IWorkshopRepository extends IRepository<IWorkshopDatabase> {
    getByInstructor(user_id: string): Promise<IWorkshopDatabase[]>;
    getByInstructorAndId(userId: string, workshopId: string): Promise<IWorkshopDatabase | null>
}

export interface IEventRepository extends IRepository<IEventDatabase> {}
