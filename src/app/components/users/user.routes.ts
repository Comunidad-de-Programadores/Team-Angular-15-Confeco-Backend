// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports children routes.
import { BadgesUsersRoutes } from "./badges/badges.routes";

// Imports middlewares.
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports rules.
import { uploadImage, conditionRequestRules } from "../../rules/rules";

// Imports controllers.
import { UserController } from "./user.controller";
const controller = new UserController;

export class UserRoutes {
    constructor(public router: Router) {
        this.me();
        this.profile();
        this.update();
        this.changeAvatar();
        this.changeBanner();
    }

    private me(): void {
        this.router.get("/me", [auth.isAuth], controller.me);
    }

    private profile(): void {
        this.router.get("/:id/profile", controller.profile);
    }

    private update(): void {
        this.router.put("/:userId", [auth.isAuth], controller.update);
    }

    private changeAvatar(): void {
        this.router.patch(
            "/:userId/avatar",
            [auth.isAuth, uploadImage, conditionRequestRules],
            controller.changeAvatar
        );
    }

    private changeBanner(): void {
        this.router.patch(
            "/:userId/banner",
            [auth.isAuth, uploadImage, conditionRequestRules],
            controller.changeBanner
        );
    }
};

export const userRoutes: IRouter = {
    path: "/api/v1/users",
    component: new UserRoutes(Router()).router,
    children: [
        {
            path: "/:userId/badges",
            component: new BadgesUsersRoutes(Router({ mergeParams: true })).router
        }
    ]
};
