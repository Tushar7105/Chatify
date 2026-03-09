import resend from "resend";
import "dotenv/config";

const resendCliend = new resend(process.env.RESEND_API_KEY);

export const sender = {
    email : process.env.EMAIL_FROM,
    name : process.env.EMAIL_FROM_NAME
}