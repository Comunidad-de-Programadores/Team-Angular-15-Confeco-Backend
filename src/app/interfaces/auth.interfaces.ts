import { User } from "../models/User";

export interface IAuth<Tval> {
    auth(): Promise<Tval>;
};

export interface IRegisterParams {
    nickname: string;
    email: string;
    password: string;
}

export interface IEmailVerificacionToken {
    token: string;
    email: string;
};

export interface IAuthRes {
    user: User,
    tokens: {
        access_token: string;
        refresh_token: string;
    };
}
