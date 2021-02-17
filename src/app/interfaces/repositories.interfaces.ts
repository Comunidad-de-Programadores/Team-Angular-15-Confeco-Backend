// Imports models.
import { PasswordReset } from "../models/PasswordReset";
import { User } from "../models/User";

export interface IDatabaseRepository<Tval> {
    create(entity: Tval): Promise<void>;
    get(id: string): Promise<Tval | null>;
    update(id: string, data: Tval): Promise<void>;
    delete(id: string): Promise<void>;
};

export interface IDatabaseUserRepository extends IDatabaseRepository<User> {
    getByEmail(email: string): Promise<User | null>;
    updateStatusEmail(id: string, status: boolean): Promise<void>;
    updatePassword(email: string, password: string): Promise<void>;
};

export interface IDatabasePasswordResetRepository extends IDatabaseRepository<PasswordReset> {
    getByEmail(email: string): Promise<PasswordReset | null>;
}
