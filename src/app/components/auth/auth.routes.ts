// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRouter } from "../../routes/interfaces/routes.interfaces";

// Imports rules.
import * as rules from "../../rules/rules";

// Imports middlewares
import { AuthMiddleware } from "../../middlewares/auth.middleware";
const auth: AuthMiddleware = new AuthMiddleware;

// Imports controllers
import { AuthControllerComponents } from "./auth.controller";
const controller = new AuthControllerComponents();

export class AuthRoutesComponent {
    constructor(public router: Router) {
        // Auth local.
        this.register();
        this.login();
        this.verificationEmail();
        this.changeEmail();

        // Password
        this.forgotPassword();
        this.showResetPassword();
        this.resetPassword();

        // Social auth
        this.google();
        this.facebook();
    }

    private register(): void {
        this.router.post(
            "/register",
            [rules.email, rules.password, rules.nickname, rules.conditionRequestRules],
            controller.register
        );
    }

    private login(): void {
        this.router.post(
            "/login",
            [rules.email, rules.password, rules.conditionRequestRules],
            controller.login
        );
    }

    private verificationEmail(): void {
        this.router.get("/confirm_email/:token", controller.verificationEmail);
    }

    private forgotPassword(): void {
        this.router.post(
            "/password/forgot",
            [rules.email, rules.conditionRequestRules],
            controller.forgotPassword
        );
    }

    private showResetPassword(): void {
        this.router.get(
            "/password/reset/:token",
            controller.showResetPassword
        );
    }

    private resetPassword(): void {
        this.router.post(
            "/password/reset",
            rules.checkFieldsResetPassword,
            controller.resetPassword
        );
    }

    private google(): void {
        this.router.post("/google", controller.google);
    }

    private facebook(): void {
        this.router.post("/facebook", controller.facebook);
    }

    private changeEmail(): void {
        this.router.post(
            "/requestEmailChange",
            [auth.isAuth, rules.email, rules.password, rules.conditionRequestRules, auth.verifyCredentials],
            controller.requestEmailChange
        );
    }
};

export const authRoutes: IRouter = {
    path: "/api/v1/auth",
    component: new AuthRoutesComponent(Router()).router
};
