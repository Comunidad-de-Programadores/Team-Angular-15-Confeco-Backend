export class User {
    _id: string;
    nickname: string;
    email: string;
    password?: string;
    verified_email?: boolean;
    created_at?: number;
    updated_at?: number;

    constructor(user: User) {
        this._id = user._id;
        this.nickname = user?.nickname;
        this.email = user?.email;
        this.password = user.password;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
        this.verified_email = user.verified_email;
    }
};
