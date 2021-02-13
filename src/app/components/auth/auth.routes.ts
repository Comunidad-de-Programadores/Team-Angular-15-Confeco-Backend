// Imports modules.
import { Router } from "express";

// Imports rules.
import { AuthenticationRules } from "../../rules/Authenticationrules";
const { checkFieldsBeforeRegistration } = new AuthenticationRules();

// Imports controllers
import { AuthControllerComponents } from "./auth.controller";
const { register, login, google } = new AuthControllerComponents();

export class AuthRoutesComponent {
    constructor(public router: Router) {
        this.register();
        this.login();
        this.google();
    }

    private register(): void {
        this.router.post("/auth/register", checkFieldsBeforeRegistration, register);
    }

    private login(): void {
        this.router.post("/auth/login", login);
    }

    private google(): void {
        this.router.post("/auth/google", google);
    }
};
