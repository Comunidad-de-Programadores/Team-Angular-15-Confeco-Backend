// Imports interfaces.
import { IRouter } from "./interfaces/routes.interfaces";

// Imports components routes.
import { authRoutes } from "../components/auth/auth.routes";
import { workshopsRoutes } from "../components/workshops/workshops.routes";
import { knowledgeRoutes } from "../components/knowledge_areas/KnowledgeArea.routes";
import { userRoutes } from "../components/users/user.routes";

export const routes: IRouter[] = [
    authRoutes,
    userRoutes,
    workshopsRoutes,
    knowledgeRoutes
];
