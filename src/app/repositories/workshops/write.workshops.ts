// Imports database models.
import { models } from "../../database/mongo";

// Imports interfaces.
import { Create } from "../interfaces/repository.interfaces";

// Imports models.
import { Workshop } from "../../models/Workshop";

export class CreateWorkshop implements Create<Workshop> {
    async create(workshop: Workshop): Promise<void> {
        await models.Workshop.create(workshop);
    }
}