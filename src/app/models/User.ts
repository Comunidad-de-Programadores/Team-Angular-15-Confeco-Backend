export class User {
    _id: string;
    nickname: string;
    email: string;
    password?: string;
    provider?: string;
    created_at?: number;
    updated_at?: number;

    constructor(user: User) {
        this._id = user._id;
        this.nickname = user?.nickname;
        this.email = user?.email;
        this.password = user.password;
        this.provider = user.provider;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
    }
};
