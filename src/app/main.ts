// 📦 Imports modules.
import { Express } from "express";
import { Server } from "http";

export class MainApp {
    constructor(
        private app: Express,
        private http: Server
    ) {}

    /**
     * 🚀 Run the server!
     */
    run(): void {
        this.http.listen(5050, () => console.log("🚀 Execute app in the port:5050"));
    }
}
