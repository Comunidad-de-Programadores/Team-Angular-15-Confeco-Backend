// Imports modules.
import { Router } from "express";

// Imports controllers
import { AuthControllerComponents } from "./auth.controller";
const { register, login, google, verify_email } = new AuthControllerComponents();

export class AuthRoutesComponent {
    constructor(public router: Router) {
        this.register();
        this.login();
        this.verify_email();
        this.google();
    }

    private register(): void {
        this.router.post("/auth/register", register);
    }

    private login(): void {
        this.router.post("/auth/login", login);
    }

    private verify_email(): void {
        this.router.get("/auth/verify_email/:token", verify_email);
    }

    private google(): void {
        this.router.post("/auth/google", google);
    }
};
