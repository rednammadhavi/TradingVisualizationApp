import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE, // e.g., 'gmail'
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });

    await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: options.to,
        subject: options.subject,
        text: options.text
    });
};

export default sendEmail;
