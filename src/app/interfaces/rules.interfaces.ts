export interface IRule {
    field: string;
    value: string;
    types: ((data: any) => string | true)[]
};

export interface IRuleError {
    field: string;
    message: string;
};
