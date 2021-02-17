// Imports modules.
import { createTransport } from "nodemailer";

// Imports environments.
import { environments } from "./environments";

export default createTransport({
    host: environments.MAILTRAP_HOST,
    port: Number(environments.MAILTRAP_PORT),
    auth: {
        user: environments.MAILTRAP_USER,
        pass: environments.MAILTRAP_PASS
    }
});
