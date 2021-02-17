// Imports modules.
import { Express } from "express";

// Server routes.
import { routes } from "./routes";

export class IndexRoutes {
    constructor(public main: Express) {
        this.routes();
        this.notFound();
    }
    
    private routes(): void {
        routes.forEach(route => this.main.use("/api", route));
    }
    
    private notFound(): void {        
        this.main.get("**", (req, res) => {
            res.status(404).json({
                code: 404,
                name: "NotFound",
                message: "El recurso solicitado no fue encontrado."
            });
        });
    }
}
