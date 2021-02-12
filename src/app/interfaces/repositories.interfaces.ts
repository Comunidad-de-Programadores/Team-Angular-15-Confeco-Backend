// Imports models.
import { User } from "../models/User";

export interface IDatabaseRepository<Tval> {
    create(entity: Tval): Promise<void>;
    get(id: string): Promise<Tval | null>;
};

export interface IDatabaseUserRepository extends IDatabaseRepository<User> {
    getByEmail(email: string): Promise<User | null>;
};
