// Imports repositories.
import { DatabaseRepository } from "../../repositories/DatabaseRepository";

export class WorkshopsPostman {
    private database: DatabaseRepository<string, any>;

    constructor() {
        this.database = new DatabaseRepository;
    }
}
