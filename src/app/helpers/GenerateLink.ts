import { environments } from "../config/environments";

export class GenerateLink {
    confirmEmail(token: string): string {
        return `${ environments.URL }/v1/auth/confirm_email/${ token }`;
    }

    resetPassword(token: string): string {
        return `${ environments.URL }/v1/auth/password/reset/${ token }`;
    }

    resetEmail(token: string): string {
        return `${ environments.URL }/v1/auth/email/reset/${ token }`;
    }
}