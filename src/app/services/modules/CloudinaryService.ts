// Imports modules.
import cloudinary from "../../config/cloudinary";
import uniqid from "uniqid";

// Imports interfaces.
import { CloudServiceAdapter, ResUpload } from "../interfaces/cloudservice.interfaces";

export class CloudinaryService implements CloudServiceAdapter {
    upload(data: Buffer, folder: string): Promise<ResUpload> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_chunked_stream(
                // Options.
                { name: uniqid(), folder },

                // Callback
                (error, result) => {
                    if (error || !result) return reject(error);
                    resolve({
                        size: result.bytes,
                        url: result.secure_url,
                        mimeType: result.resource_type,
                        created_at: new Date(result.created_at)
                    });
                }
            ).end(data);
        });
    }
}