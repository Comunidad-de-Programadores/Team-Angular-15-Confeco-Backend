export interface Create<Tval> {
    create(entity: Tval): Promise<void>;
}

export interface Get<Tkey, Tval> {
    get(key: Tkey): Promise<Tval | null>;
}
