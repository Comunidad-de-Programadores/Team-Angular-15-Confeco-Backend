// Imports interfaces.
import { IAuth } from "../../../interfaces/auth.interfaces";

export class ForgotPassword implements IAuth<string> {
    async auth(): Promise<string> {
        return "";
    }
};
