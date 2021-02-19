// Imports modules.
import { Router } from "express";

// Imports interfaces.
import { IRoute } from "../../routes/interfaces/routes.interfaces";

// Imports rules.
import * as rules from "../../rules/rules";

// Imports controllers
import { AuthControllerComponents } from "./auth.controller";
const auth = new AuthControllerComponents();

export class AuthRoutesComponent {
    constructor(public router: Router) {
        // Auth local.
        this.register();
        this.login();
        this.verificationEmail();

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
            auth.register
        );
    }

    private login(): void {
        this.router.post(
            "/login",
            [rules.email, rules.password, rules.conditionRequestRules],
            auth.login
        );
    }

    private verificationEmail(): void {
        this.router.get("/confirm_email/:token", auth.verificationEmail);
    }

    private forgotPassword(): void {
        this.router.post(
            "/password/forgot",
            [rules.email, rules.conditionRequestRules],
            auth.forgotPassword
        );
    }

    private showResetPassword(): void {
        this.router.get(
            "/password/reset/:token",
            auth.showResetPassword
        );
    }

    private resetPassword(): void {
        this.router.post(
            "/password/reset",
            rules.checkFieldsResetPassword,
            auth.resetPassword
        );
    }

    private google(): void {
        this.router.post("/google", auth.google);
    }

    private facebook(): void {
        this.router.post("/facebook", auth.facebook);
    }
};

export const authRoutes: IRoute = {
    path: "/api/v1/auth",
    component: new AuthRoutesComponent(Router()).router
};
