// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports child routes
import { GroupsUsersRoutes } from "./users/users.routes";

// Imports middlewares.
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controllers.
import { GroupsController } from "./groups.controllers";
const groups: GroupsController = new GroupsController;

export class GroupsRoutes {
    constructor(public router: Router) {
        this.list();
    }

    private list(): void {
        this.router.get("/", [auth.isAuth], groups.list);
    }
}

export const groupsRoutes: IRouter = {
    path: "/api/v1/groups",
    component: new GroupsRoutes(Router()).router,
    children: [
        {
            path: "/:groupId/users",
            component: new GroupsUsersRoutes(Router({ mergeParams: true })).router
        }
    ]
}
