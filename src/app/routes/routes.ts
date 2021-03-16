// Imports interfaces.
import { IRouter } from "./interfaces/routes.interfaces";

// Imports components routes.
import { authRoutes } from "../components/auth/auth.routes";
import { userRoutes } from "../components/users/user.routes";
import { knowlegAreaRoutes } from "../components/knowledgeAreas/knowledgeArea.routes";
import { workshopsRoutes } from "../components/workshops/workshops.routes";
import { contentCreators } from "../components/instructors/contentCreators.routes";

export const routes: IRouter[] = [
    authRoutes,
    userRoutes,
    contentCreators,
    knowlegAreaRoutes,
    workshopsRoutes
];
