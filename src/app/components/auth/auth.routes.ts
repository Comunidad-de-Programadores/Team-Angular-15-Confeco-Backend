// Imports modules.
import { Router } from "express";

export class AuthRoutesComponent {
    constructor(public router: Router) {
        this.register();
        this.login();
    }

    private register(): void {
        this.router.get("/auth/register", (req, res) => res.json({ message:  "Register pages" }));
    }

    private login(): void {
        this.router.get("/auth/login", (req, res) => res.json({ message:  "Login pages" }));
    }
};
