// Imports interfaces.
import { IAuth } from "../interfaces/auth.interfaces";

export class VerifyEmailChangeToken implements IAuth<void> {
    async auth(): Promise<void> {}
}
