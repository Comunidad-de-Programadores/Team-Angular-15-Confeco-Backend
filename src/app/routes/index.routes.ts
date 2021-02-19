// Imports modules.
import { Express } from "express";

// Server routes.
import { routes } from "./routes";

export class IndexRoutes {
    constructor(public main: Express) {
        routes.forEach(route => main.use(route.path, route.component));
    }
}
