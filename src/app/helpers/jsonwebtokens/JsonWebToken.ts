// Imports interfaces.
import { IGenerateToken, IPayloadJwt, IVerifyToken } from "../../interfaces/jwt.interfaces";

export class JsonWebToken {
    generate(payload: IPayloadJwt, feature: IGenerateToken<IPayloadJwt>) {
        return feature.generate(payload);
    }

    verify(token: string, feature: IVerifyToken<IPayloadJwt>) {
        return feature.verify(token);
    }
};
