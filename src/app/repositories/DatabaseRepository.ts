// Imports interfaces.
import { Create, Get, List, Update } from "./interfaces/repository.interfaces";

export class DatabaseRepository<Tval> {
    async create(entity: Tval, action: Create<Tval>): Promise<void> {
        return await action.create(entity);
    }

    async get(action: Get<Tval>): Promise<Tval | null> {
        return await action.get();
    }

    async list(action: List<Tval>): Promise<Tval[]> {
        return await action.list();
    }

    async update(action: Update): Promise<void> {
        return await action.update();
    }
}
