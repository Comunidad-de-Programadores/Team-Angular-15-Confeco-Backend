import { Timestamp } from "./Timestamp";

export class User extends Timestamp {
    _id: string;
    nickname: string;
    email: string;
    verified_email?: boolean;

    constructor(user: User) {
        super();
        this._id = user._id;
        this.nickname = user.nickname;
        this.email = user.email;
        this.verified_email = user.verified_email;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
    }
};
