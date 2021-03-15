export interface Create<Tval> {
    create(entity: Tval): Promise<void>;
}
