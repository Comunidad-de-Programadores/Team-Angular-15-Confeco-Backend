// Imports modules.
import { genSalt, hash, compare } from "bcryptjs";

// Imports interfaces.
import { IEncrypt } from "../interfaces/encrypt.interface";

export class BcryptPassword implements IEncrypt {
    async encrypt(password: string): Promise<string> {
        const salt: string = await genSalt(10);
        return await hash(password, salt);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await compare(password, hash);
    }
}
