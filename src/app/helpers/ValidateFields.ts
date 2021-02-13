// Imports interfaces.
import { IRule, IRuleError } from "../interfaces/rules.interfaces";

export class ValidateFields {
    constructor(private items: IRule[]) {}

    validate(): IRuleError[] {
        let errors: IRuleError[] = [];

        this.items.forEach(item => {
            item.types.some(type => {
                const result: string | true = type(item.value);

                if (typeof result === "string") {
                    errors.push({ field: item.field, message: result });
                    return true;
                }
            });
        });

        return errors;
    }
};
