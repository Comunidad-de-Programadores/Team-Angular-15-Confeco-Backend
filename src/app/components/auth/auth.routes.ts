// Imports modules.
import { Router } from "express";

// Imports rules.
import { AuthenticationRules } from "../../rules/AuthenticationRules";
const {
    checkFieldsBeforeRegistration,
    checkFieldsBeforeLogin,
    checkFieldsSendPwdPasswordReset,
    checkFieldsBeforePasswordReset
} = new AuthenticationRules();

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
            checkFieldsBeforeRegistration,
            auth.register
        );
    }

    private login(): void {
        this.router.post(
            "/auth/login",
            checkFieldsBeforeLogin,
            auth.login
        );
    }

    private verificationEmail(): void {
        this.router.get(
            "/auth/confirm_email/:token",
            auth.verificationEmail
        );
    }

    private forgotPassword(): void {
        this.router.post(
            "/auth/password/forgot",
            checkFieldsSendPwdPasswordReset,
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
            checkFieldsBeforePasswordReset,
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
