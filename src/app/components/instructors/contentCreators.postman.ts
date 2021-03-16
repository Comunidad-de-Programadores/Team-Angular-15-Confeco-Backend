import { DatabaseRepository } from "../../repositories/DatabaseRepository";

export class ContentCreatorsPostman {
    private database: DatabaseRepository<string, any>;

    constructor() {
        this.database = new DatabaseRepository;
    }
}
