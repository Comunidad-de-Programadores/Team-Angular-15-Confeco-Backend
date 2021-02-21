// Imports interfaces.
import { IRoute } from "./interfaces/routes.interfaces";

// Imports components routes.
import { authRoutes } from "../components/auth/auth.routes";
import { workshopsRoutes } from "../components/workshops/workshops.routes";
import { knowledgeRoutes } from "../components/knowledge_areas/KnowledgeArea.routes";
import { instructorRoutes } from "../components/instructors/instructor.routes";

export const routes: IRoute[] = [
    authRoutes,
    instructorRoutes,
    workshopsRoutes,
    knowledgeRoutes
];
