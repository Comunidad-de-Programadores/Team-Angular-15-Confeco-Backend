export interface IMail {
    from: string;
    to: string;
    subject: string;
    text?: string;
};

export interface IConfirmEmail {
    nickname: string;
    email: string;
    url: string;
};

export interface ISendMail {
    send(): Promise<void>;
};
