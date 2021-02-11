// 📦 Imports modules.
import express from "express";
import { Server } from "http";
import morgan from "morgan";
import cors from "cors";

// 🏔️ Import environments
import { environments } from "./config/environments";

// 🚦 Imports routes.
import { IndexRoutes } from "./routes/index.routes";

export class MainApp {
    constructor(
        private app: express.Express,
        private http: Server
    ) {
        this.middleware();
        this.routes();
    }

    /**
     * ✨ Registers global middleware.
     */
    private middleware(): void {
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    /**
     * 🚦 record server routes.
     */
    private routes(): void {
        const { main } = new IndexRoutes(express());
        this.app.use(main);
    }

    /**
     * 🚀 Run the server!
     */
    run(): void {
        const { PORT } = environments;
        const message = `🚀 Execute app in port:${ PORT }`;
        this.http.listen(PORT, () => console.log(message));
    }
}
