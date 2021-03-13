// Imports interfaces.
import { IAuth } from "../interfaces/auth.interfaces";

// Imports models.
import { User } from "../../../models/User";

// Imports facades.
import { JwtFacade } from "../../Jwt/JwtFacade";

export class EmailChangeRequest implements IAuth<any> {
    private jwt: JwtFacade;

    constructor(private user: User) {
        this.jwt = new JwtFacade;
    }

    async auth() {}
}
