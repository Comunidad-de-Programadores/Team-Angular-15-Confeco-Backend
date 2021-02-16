// 📦 Imports modules.
import { resolve } from "path";
import express from "express";
import { Server } from "http"
import morgan from "morgan";
import helmet from "helmet";
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
        this.settings();
        this.middleware();
        this.routes();
        this.filesPublic();
    }

    private settings(): void {
        this.app.set("view engine", "ejs");
    }

    private middleware(): void {
        this.app.use(morgan("dev"));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(cors());
    }

    private routes(): void {
        const { main } = new IndexRoutes(express());
        this.app.use(main);
    }

    private filesPublic(): void {
        const root: string = resolve("public");
        this.app.use(express.static(root));
    }

    run(): void {
        const { PORT } = environments;
        const message = `🚀 Execute app in port:${ PORT }`;
        this.http.listen(PORT, () => console.log(message));
    }
}
