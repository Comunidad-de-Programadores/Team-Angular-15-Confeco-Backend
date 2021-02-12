export interface IGenerateToken<Tval> {
    generate(payload: Tval): string;
};

export interface IVerifyToken<Tval> {
    verify(token: string): Tval;
};

export interface IPayloadJwt {
    _id: string;
    email: string;
}
