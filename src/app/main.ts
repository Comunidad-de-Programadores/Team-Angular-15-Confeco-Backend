// 📦 Imports modules.
import { Express } from "express";
import { Server } from "http";

// Import environments
import { environments } from "./config/environments";

export class MainApp {
    constructor(
        private app: Express,
        private http: Server
    ) {}

    /**
     * 🚀 Run the server!
     */
    run(): void {
        const { PORT } = environments;
        const message = `🚀 Execute app in port:${ PORT }`;
        this.http.listen(PORT, () => console.log(message));
    }
}
