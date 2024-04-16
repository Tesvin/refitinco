import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

class Mailer {
    /**
     * a class that handles email validation
     * mail - static class method
     */
    static async mail (email, message) {
        /**
         * @param {string} receiver email
         * @param {string} message
         */
        const transporter = nodemailer.createTransport(
            {
                host: 'mail.refitsols.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'support@refitsols.com',
                    pass: 'Reftinco@support'
                }
            }
        );
        const options = {
            from: 'Refitsols',
            to: email,
            subject: message.title,
            html: message.body
        }
        const response = await transporter.sendMail(options)
        if (response.messageId) {
            return response
        }
        return {error: 'Failed to send email'};
    }
    
    static generateToken () {
        return Math.floor(100000 + Math.random() * 900000);
    }
}

export default Mailer;