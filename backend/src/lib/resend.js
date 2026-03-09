import resend from "resend";
import { ENV } from "./env.js";

const resendCliend = new resend(ENV.RESEND_API_KEY);

export const sender = {
    email : ENV.EMAIL_FROM,
    name : ENV.EMAIL_FROM_NAME
}