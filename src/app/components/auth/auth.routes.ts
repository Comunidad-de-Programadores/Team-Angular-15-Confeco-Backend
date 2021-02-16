// Imports modules.
import { Router } from "express";

// Imports rules.
import { AuthenticationRules } from "../../rules/AuthenticationRules";
const {
    checkFieldsBeforeRegistration,
    checkFieldsBeforeLogin,
    checkFieldsSendPwdPasswordReset
} = new AuthenticationRules();

// Imports controllers
import { AuthControllerComponents } from "./auth.controller";
const auth = new AuthControllerComponents();

export class AuthRoutesComponent {
    constructor(public router: Router) {
        this.register();
        this.login();
        this.verificationEmail();
        this.sendPwdResetEmail();
        this.google();
    }

    private register(): void {
        this.router.post("/auth/register", checkFieldsBeforeRegistration, auth.register);
    }

    private login(): void {
        this.router.post("/auth/login", checkFieldsBeforeLogin, auth.login);
    }

    private verificationEmail(): void {
        this.router.get("/auth/confirm_email/:token", auth.verificationEmail);
    }

    private sendPwdResetEmail(): void {
        this.router.post(
            "/auth/forgot_password",
            checkFieldsSendPwdPasswordReset,
            auth.sendPwdResetEmail
        );
    }

    private google(): void {
        this.router.post("/auth/google", auth.google);
    }
};
