// Imports modules.
import { Request } from "express";

export class EventUserPostman {
    async create(req: Request) {
        const { eventId } = req.params;
        const { userId } = req.body;
    }
}
