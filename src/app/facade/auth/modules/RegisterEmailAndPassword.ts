// Imports modules.
import createError from "http-errors";
import { v4 as uuid } from "uuid";

// Imports environments
import { environments } from "../../../config/environments";

// Imports interfaces.
import { IEncrypt } from "../../../helpers/encryptors/interfaces/encrypt.interface";
import { UserDatabase } from "../../../repositories/interfaces/entities.interfaces";
import { IAuth, IEmailVerificacionToken, IRegisterParams } from "../interfaces/auth.interfaces";

// Import model
import { User } from "../../../models/User";

// Import helper.
import { GenerateLink } from "../../../helpers/GenerateLink";

// Imports mails
import { Mail } from "../../../mails/Mail";
import { SendgridVerificationEmail } from "../../../mails/strategies/SendgridVerificationEmail";

// Import jsonwebtoken
import { JsonWebToken } from "../../../helpers/jsonwebtokens/JsonWebToken";
import { JwtEmailToken } from "../../../helpers/jsonwebtokens/strategies/JwtEmailToken";

// Imports databases.
import { DatabaseRepository } from "../../../repositories/DatabaseRepository";

// Import repository actions.
import { GetUserByEmail } from "../../../repositories/user/read.user";
import { WinBadge } from "../../../repositories/badges/write.badge";
import { CreateUser } from "../../../repositories/user/write.user";
import { BadgeUser } from "../../../models/badges/BadgeUser";

export class RegisterEmailAndPassword implements IAuth<IEmailVerificacionToken> {
    private database: DatabaseRepository<UserDatabase>;
    private databaseBadge: DatabaseRepository<BadgeUser>;
    private jsonwebtokens: JsonWebToken;
    private generateLink: GenerateLink;
    private mail: Mail;

    constructor(private encrypt: IEncrypt, private data: IRegisterParams) {
        this.databaseBadge = new DatabaseRepository;
        this.database = new DatabaseRepository;
        this.jsonwebtokens = new JsonWebToken;
        this.generateLink = new GenerateLink;
        this.mail = new Mail();
    }

    async auth(): Promise<IEmailVerificacionToken> {
        // Check if the user exists.
        let params: IRegisterParams = Object.assign({}, this.data);
        const result = await this.database.get(new GetUserByEmail(params.email));

        if (result) throw createError(403, "Este email ya se encuentra en uso.", {
            name: "EmailAlreadyExist"
        });

        // Encrypt password.
        params.password = await this.encrypt.encrypt(params.password);

        // Save user to the database.
        await this.database.create({ _id: uuid(), ...params }, new CreateUser);

        // Get fields user.
        const data: UserDatabase | null = await this.database.get(new GetUserByEmail(params.email));
        if (!data) throw createError(400, "Sucedio un error durante autenticacion.", {
            name: "AuthenticationError"
        });

        // Win a badge.
        await this.databaseBadge.create(new BadgeUser({
            _id: uuid(),
            userId: data._id,
            badgeId: environments.BADGE_GENESIS_ID as string,
        }), new WinBadge);

        const user = Object.assign({}, new User(data));
        const { nickname, email } = user;
        
        // Generate token and confirmation link
        const token: string = this.jsonwebtokens.generate({ data: user }, new JwtEmailToken);
        const url: string = this.generateLink.confirmEmail(token);
        
        // Send email.
        this.mail.send(new SendgridVerificationEmail({ url, nickname, email }));
        return { nickname, email, url };
    }
};
