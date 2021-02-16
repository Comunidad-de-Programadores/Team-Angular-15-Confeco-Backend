export class PasswordReset {
    _id: string;
    email: string;
    token: string;
    created_at?: number;

    constructor(data: PasswordReset) {
        this._id = data._id;
        this.email = data.email;
        this.token = data._id;
        this.created_at = data.created_at;
    }
};
