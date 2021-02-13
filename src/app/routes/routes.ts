// Imports modules.
import { Router } from "express";

// Imports components routes.
import { AuthRoutesComponent } from "../components/auth/auth.routes";

export const routes: Router[] = [
    new AuthRoutesComponent(Router()).router
];
