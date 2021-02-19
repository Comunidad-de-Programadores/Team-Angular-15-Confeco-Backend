// Imports interfaces.
import { IUserDatabase } from "./user.interfaces";

export interface IDatabaseRepository<Tval> {
    create(entity: Tval): Promise<void>;
    get(id: string): Promise<Tval | null>;
    update(id: string, data: Tval): Promise<void>;
    delete(id: string): Promise<void>;
};

export interface IDatabaseUserRepository extends IDatabaseRepository<IUserDatabase> {
    getByEmail(email: string): Promise<IUserDatabase | null>;
    updateStatusEmail(id: string, status: boolean): Promise<void>;
    updatePassword(email: string, password: string): Promise<void>;
    updatePasswordResetToken(id: string, token: string | undefined): Promise<void>;
};
