export interface IEncrypt {
    encrypt(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
};
