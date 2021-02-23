// Imports modules.
import { Express } from "express";
import { IRouter } from "./interfaces/routes.interfaces";

// Server routes.
import { routes } from "./routes";

export class IndexRoutes {
    constructor(public main: Express) {
        this.executeRoutes();
        this.notFound();
    }

    private executeRoutes(): void {
        routes.forEach(route => this.loadRoutesRecursive(route));
    }

    private loadRoutesRecursive(route: IRouter): void {
        if (route.children) {
            route.children.forEach(item => {
                const path: string = route.path + item.path;
                if (item.children) {
                    return this.loadRoutesRecursive({ ...item, path });
                }
                this.main.use(path, item.component);
            });
        }
        this.main.use(route.path, route.component);
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
