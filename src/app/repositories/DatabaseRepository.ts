import { Create } from "./interfaces/repository.interfaces";

export class DatabaseRepository<TKey, Tval> {
    async create(entity: Tval, action: Create<Tval>): Promise<void> {
        return await action.create(entity);
    }
}
