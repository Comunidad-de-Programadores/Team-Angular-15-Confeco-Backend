// Imports modules.
import sendgrid from "@sendgrid/mail";
import { environments } from "./environments";

sendgrid.setApiKey(environments.SENDGRID_API_KEY as string);

export default sendgrid;
