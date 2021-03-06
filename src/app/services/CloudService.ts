// Imports modules.
import { UploadedFile } from "express-fileupload";

export class CloudService {
    async upload(file: UploadedFile) {
        console.log(file);
    }
}
