// Imports modules.
import { Router } from "express";

export interface IRouter {
    path: string;
    component: Router;
    children?: IRouter[];
};