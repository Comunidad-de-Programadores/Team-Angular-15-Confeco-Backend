// Imports models.
import { Entity } from "./Entity";
import { User } from "./User";

export class Comunity extends Entity {
    administrators: string[] | User[];
    constructor(comunity: Comunity) {
        super(comunity);

        this.administrators = comunity.administrators;
    }
};
