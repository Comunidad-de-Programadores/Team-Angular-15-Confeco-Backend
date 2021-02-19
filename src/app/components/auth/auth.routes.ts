// Imports modules.
import { Router } from "express";

// Imports rules.
import * as rules from "../../rules/rules";

// Imports controllers
import { AuthControllerComponents } from "./auth.controller";
const auth = new AuthControllerComponents();

export class AuthRoutesComponent {
    constructor(public router: Router) {
        this.register();
        this.login();
        this.verificationEmail();
        this.forgotPassword();
        this.showResetPassword();
        this.resetPassword();
        this.google();
        this.facebook();
    }

    private register(): void {
        this.router.post(
            "/auth/register",
            [rules.email, rules.password, rules.nickname, rules.conditionRequestRules],
            auth.register
        );
    }

    private login(): void {
        this.router.post(
            "/auth/login",
            [rules.email, rules.password, rules.conditionRequestRules],
            auth.login
        );
    }

    private verificationEmail(): void {
        this.router.get("/auth/confirm_email/:token", auth.verificationEmail);
    }

    private forgotPassword(): void {
        this.router.post(
            "/auth/password/forgot",
            [rules.email, rules.conditionRequestRules],
            auth.forgotPassword
        );
    }

    private showResetPassword(): void {
        this.router.get(
            "/auth/password/reset/:token",
            auth.showResetPassword
        );
    }

    private resetPassword(): void {
        this.router.post(
            "/auth/password/reset",
            rules.checkFieldsResetPassword,
            auth.resetPassword
        );
    }

    private google(): void {
        this.router.post("/auth/google", auth.google);
    }

    private facebook(): void {
        this.router.post("/auth/facebook", auth.facebook);
    }
};
