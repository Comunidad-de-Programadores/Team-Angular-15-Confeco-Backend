// Imports interfaces.
import { IRoute } from "./interfaces/routes.interfaces";

// Imports components routes.
import { authRoutes } from "../components/auth/auth.routes";

export const routes: IRoute[] = [
    authRoutes
];
