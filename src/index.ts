// 📦 Imports modules.
import express from "express";
import http from "http";

// Initialize the app.
const app: express.Express = express();
const server: http.Server = http.createServer(app);

// Import my app.
import { MainApp } from "./app/main";
const mainApp: MainApp = new MainApp(app, server);
mainApp.run();
