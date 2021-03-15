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
// import { SendgridVerificationEmail } from "../../../mails/strategies/SendgridVerificationEmail";
import { MailtrapVerificacionEmail } from "../../../mails/strategies/MailtrapVerificacionEmail";
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";
import { CreateUser } from "../../../repositories/user/write.user";

export class RegisterEmailAndPassword implements IAuth<IEmailVerificacionToken> {
    private database: DatabaseRepository<string, UserDatabase>;
    private jwt: JwtFacade;
    private mail: Mail;

    constructor(
        private repository: IDatabaseUserRepository,
        private encrypt: IEncrypt,
        private data: IRegisterParams
    ) {
        this.database = new DatabaseRepository;
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
        // await this.repository.create({ _id: uuid(), ...params });
        await this.database.create({ _id: uuid(), ...params }, new CreateUser);

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
        this.mail.send(new MailtrapVerificacionEmail({ url, nickname, email }));
        return { nickname, email, url };
    }
};
