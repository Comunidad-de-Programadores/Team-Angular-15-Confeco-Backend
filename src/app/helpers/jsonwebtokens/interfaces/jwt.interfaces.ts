export interface PayloadJWT<Tval> {
    data: Tval;
    expiresIn?: string | number | undefined;
}

export interface IGenerateToken<Tval> {
    generate(payload: PayloadJWT<Tval>): string;
};

export interface IVerifyToken<Tval> {
    verify(token: string): Tval;
};

export interface IPayloadJwt {
    _id: string;
    email: string;
}
