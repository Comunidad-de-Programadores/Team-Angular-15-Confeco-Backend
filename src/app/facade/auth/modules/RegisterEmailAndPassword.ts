// Imports modules.
import createError from "http-errors";
import { v4 as uuid } from "uuid";

// Imports environments
import { environments } from "../../../config/environments";

// Imports interfaces.
import { User } from "../../../models/User";
import { IEncrypt } from "../../../helpers/encryptors/interfaces/encrypt.interface";
import { IAuth, IEmailVerificacionToken, IRegisterParams } from "../interfaces/auth.interfaces";
import { IDatabaseUserRepository } from "../../../database/interfaces/repositories.interfaces";

// Imports jsonwebtokens.
import { JwtFacade } from "../../Jwt/JwtFacade";

// Imports mails
import { Mail } from "../../../mails/Mail";
import { SendgridVerificationEmail } from "../../../mails/strategies/SendgridVerificationEmail";

export class RegisterEmailAndPassword implements IAuth<IEmailVerificacionToken> {
    private jwt: JwtFacade;
    private mail: Mail;

    constructor(
        private repository: IDatabaseUserRepository,
        private encrypt: IEncrypt,
        private data: IRegisterParams
    ) {
        this.jwt = new JwtFacade();
        this.mail = new Mail();
    }

    async auth(): Promise<IEmailVerificacionToken> {
        // Check if the user exists.
        let params: IRegisterParams = Object.assign({}, this.data);
        const result = await this.repository.getByEmail(params.email);
        
        if (result) throw createError(403, "Este email ya se encuentra en uso.", {
            name: "EmailAlreadyExist"
        });

        // Encrypt password.
        params.password = await this.encrypt.encrypt(params.password);

        // Save user to the database.
        await this.repository.create({ _id: uuid(), ...params });

        // Get fields user.
        const data = await this.repository.getByEmail(params.email);
        if (!data) throw createError(400, "Sucedio un error durante autenticacion.", {
            name: "AuthenticationError"
        });

        // Generate confirmation link.
        const user = Object.assign({}, new User(data));
        const { nickname, email } = user;
        const token: string = this.jwt.generateEmailConfirmationLink(user);
        
        // Send email.
        const url = `${ environments.URL }/v1/auth/confirm_email/${ token }`;
        this.mail.send(new SendgridVerificationEmail({ url, nickname, email }));
        return { nickname, email, url };
    }
};
