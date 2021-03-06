// Imports modules.
import { UploadedFile } from "express-fileupload";

// Import interfaces.
import { CloudServiceAdapter, ResUpload } from "./interfaces/cloudservice.interfaces";

export class CloudService {
    constructor(private service: CloudServiceAdapter) {}

    async upload(file: UploadedFile, folder: string): Promise<ResUpload> {
        return  await this.service.upload(file.data, `teamangular15/${ folder }`);
    }
}
