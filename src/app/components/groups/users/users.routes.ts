// Imports modules.
import { Router } from "express";

// Imports middlewares.
import { AuthMiddleware } from "../../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controllers
import { GroupsUsersController } from "./users.controller";
const controller: GroupsUsersController = new GroupsUsersController;

export class GroupsUsersRoutes {
    constructor(public router: Router) {
        this.create();
        this.remove();
    }

    private create() : void {
        this.router.post("/", [auth.isAuth], controller.create);
    }

    private remove(): void {
        this.router.delete("/:userId", [auth.isAuth], controller.remove);
    }
}
