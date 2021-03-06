export interface ResUpload {
    url: string;
    size: number;
    created_at: Date;
    mimeType: string;
}

export interface CloudServiceAdapter {
    upload(data: Buffer, folder: string): Promise<ResUpload>;
}
