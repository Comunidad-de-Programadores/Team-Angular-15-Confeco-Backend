// 📦 Imports modules.
import { Express } from "express";
import { Server } from "http";
import morgan from "morgan";

// Import environments
import { environments } from "./config/environments";

export class MainApp {
    constructor(
        private app: Express,
        private http: Server
    ) {
        this.middleware();
    }

    private middleware(): void {
        this.app.use(morgan("dev"));
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
