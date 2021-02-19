// Imports modules.
import { Express } from "express";

// Server routes.
import { routes } from "./routes";

export class IndexRoutes {
    constructor(public main: Express) {
        this.executeRoutes();
        this.notFound();
    }

    private executeRoutes(): void {
        routes.forEach(route => this.main.use(route.path, route.component));
    }

    private notFound(): void {
        this.main.get("*", (req, res, next) => {
            if (req.headers.accept?.includes("html")) {
                return res.status(404).json({
                    code: 404,
                    name: "NotFound",
                    message: "El recurso solicitado no existe."
                });
            }
            return next();
        });
    }
}
