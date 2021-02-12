export interface ISendMail {
    send(): Promise<void>;
};

export interface IMail {
    from: string;
    to: string;
    subject: string;
    text?: string;
}

export interface IMailConfirmEmail extends IMail {
    nickname: string;
    url: string;
}
