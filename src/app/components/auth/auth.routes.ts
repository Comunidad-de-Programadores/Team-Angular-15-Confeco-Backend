// Imports modules.
import { Router } from "express";

// Imports controllers
import { AuthControllerComponents } from "./auth.controller";
const { register, login } = new AuthControllerComponents();

export class AuthRoutesComponent {
    constructor(public router: Router) {
        this.register();
        this.login();
    }

    private register(): void {
        this.router.get("/auth/register", register);
    }

    private login(): void {
        this.router.get("/auth/login", login);
    }
};
