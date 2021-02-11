// Imports modules.
import { Express, Router } from "express";

// Server routes.
const routes: Router[] = [
    // Components routes...
];

export class MainRoutes {
    constructor(public main: Express) {
        routes.forEach(route => this.main.use("/api", route));
    }
}
