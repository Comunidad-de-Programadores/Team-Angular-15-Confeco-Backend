// Imports modules.
import { config } from "dotenv";

// Verify env.
if (process.env.NODE_ENV !== "production") config();

export const environments = {
    PORT: process.env.PORT
};
