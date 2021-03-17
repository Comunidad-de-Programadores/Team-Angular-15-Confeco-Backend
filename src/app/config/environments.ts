// Imports modules.
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") config();

export const environments = {
    PORT: process.env.PORT,
    URL: process.env.URL,

    MONGODB_URI: process.env.MONGODB_URI,

    JWT_ACCESS_TOKEN_KEY: process.env.JWT_ACCESS_TOKEN_KEY,
    JWT_REFRESH_TOKEN_KEY: process.env.JWT_REFRESH_TOKEN_KEY,
    JWT_EMAIL_VERIFICACION: process.env.JWT_EMAIL_VERIFICACION,
    JWT_RESET_PASSWORD_KEY: process.env.JWT_RESET_PASSWORD_KEY,
    JWT_CHANGE_EMAIL_KEY: process.env.JWT_CHANGE_EMAIL_KEY,

    BADGE_SOCIAL_ID: process.env.BADGE_SOCIAL_ID,
    BADGE_GENESIS_ID: process.env.BADGE_GENESIS_ID,
    BADGE_SEDUCTOR_ID: process.env.BADGE_SEDUCTOR_ID,
    BADGE_COMPETIDOR_ID: process.env.BADGE_COMPETIDOR_ID,

    CLOUDNAME_CLOUDINARY: process.env.CLOUDNAME_CLOUDINARY,
    API_KEY_CLOUDINARY: process.env.API_KEY_CLOUDINARY,
    API_SECRET_CLOUDINARY: process.env.API_SECRET_CLOUDINARY,

    MAILTRAP_HOST: process.env.MAILTRAP_HOST,
    MAILTRAP_PORT: process.env.MAILTRAP_PORT,
    MAILTRAP_USER: process.env.MAILTRAP_USER,
    MAILTRAP_PASS: process.env.MAILTRAP_PASS,

    SENDGRID_FROM_EMAIL: process.env.SENDGRID_FROM_EMAIL,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
