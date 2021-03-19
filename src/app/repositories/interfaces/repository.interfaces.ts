export interface Create<Tval> {
    create(entity: Tval): Promise<void>;
}

export interface Get<Tval> {
    get(): Promise<Tval | null>;
}

export interface List<Tval> {
    list(): Promise<Tval[]>;
}

export interface Update {
    update(): Promise<void>;
}
