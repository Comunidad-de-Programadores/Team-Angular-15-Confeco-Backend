// Imports modules.
import _cloudinary from "cloudinary";

// Imports environments.
import { environments } from "./environments";

const cloudinary = _cloudinary.v2;

cloudinary.config({
    cloud_name: environments.CLOUDNAME_CLOUDINARY,
    api_key: environments.API_KEY_CLOUDINARY,
    api_secret: environments.API_SECRET_CLOUDINARY
});

export default cloudinary;
