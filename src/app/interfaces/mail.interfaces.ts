export interface IMail {
    from: string;
    to: string;
    subject: string;
    text?: string;
}

export interface ISendMail {
    send(mail: IMail): Promise<void>;
};
