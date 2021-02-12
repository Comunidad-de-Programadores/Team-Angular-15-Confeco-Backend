// Imports modules
import { sign, verify } from "jsonwebtoken";
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IGenerateToken, IPayloadJwt, IVerifyToken } from "../../../interfaces/jwt.interfaces";

export class JwtEmailToken implements IGenerateToken<IPayloadJwt>, IVerifyToken<IPayloadJwt | null> {
    generate(payload: IPayloadJwt): string {
        const { JWT_EMAIL_VERIFICACION } = environments;
        return sign(payload, JWT_EMAIL_VERIFICACION as string, { expiresIn: "5m" });
    }

    verify(token: string): IPayloadJwt | null {
        try {
            const { JWT_EMAIL_VERIFICACION } = environments;
            const { email, _id }: any = verify(token, JWT_EMAIL_VERIFICACION as string);
            return { email, _id };
        } catch (error) {
            return null;
        }
    }
}