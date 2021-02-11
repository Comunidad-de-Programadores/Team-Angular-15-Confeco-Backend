// Imports modules.
import { config } from "dotenv";

// Verify env.
if (process.env.NODE_ENV !== "production") config();

export const environments = {
    PORT: process.env.PORT,

    MONGODB_URI: process.env.MONGODB_URI,

    JWT_ACCESS_TOKEN_KEY: process.env.JWT_ACCESS_TOKEN_KEY,
    JWT_REFRESH_TOKEN_KEY: process.env.JWT_REFRESH_TOKEN_KEY,
    JWT_RESET_PASSWORD_KEY: process.env.JWT_RESET_PASSWORD_KEY,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
