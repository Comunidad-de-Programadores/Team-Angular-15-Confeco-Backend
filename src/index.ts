// Imports modules.
import express from "express";
import http from "http";

// Initialize the app.
const app: express.Express = express();
const server: http.Server = http.createServer(app);

// Import my app.
import { MainApp } from "./app/main";
const mainApp: MainApp = new MainApp(app, server);
mainApp.run();

// class IndexRoutes {
//     constructor(public app: Express) {
//         routes.forEach(route => this.loadRoutesRecursive(route));
//     }

//     private loadRoutesRecursive(route: IRouter): void {
//         if (route.childs) {
//             route.childs.forEach(item => {
//                 const root: string = route.path + item.path;
//                 if (item.childs) {
//                     return this.loadRoutesRecursive({ ...item, path: root });
//                 }
//                 this.app.use(root, item.component);
//             });
//         }

//         this.app.use(route.path, route.component);
//     }
// };
