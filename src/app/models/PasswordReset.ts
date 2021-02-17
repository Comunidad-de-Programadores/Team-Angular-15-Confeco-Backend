export class PasswordReset {
    _id: string;
    email: string;
    token: string;
    created_at?: number;
    updated_at?: number;

    constructor(data: PasswordReset) {
        this._id = data._id;
        this.email = data.email;
        this.token = data.token;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
};
