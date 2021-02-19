// Imports modules.
import { Router } from "express";

export interface IRoute {
    path: string;
    component: Router;
};