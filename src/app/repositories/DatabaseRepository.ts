// Imports interfaces.
import { Create, Get, Update } from "./interfaces/repository.interfaces";

export class DatabaseRepository<TKey, Tval> {
    async create(entity: Tval, action: Create<Tval>): Promise<void> {
        return await action.create(entity);
    }

    async get(key: TKey, action: Get<TKey, Tval>): Promise<Tval | null> {
        return await action.get(key);
    }

    async update(action: Update): Promise<void> {
        return await action.update();
    }
}
