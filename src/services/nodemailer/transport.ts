import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTransport({
//     host: process.env.MAIL_HOST,
//     port: Number(process.env.MAIL_PORT),
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: process.env.MAIL_USERNAME,
//         pass: process.env.MAIL_PASSWORD
//     },
//     debug: true,
//     logger: true
// });
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'supercompletive@gmail.com',
        pass: 'supercompletive123!'
    },
    debug: true,
    logger: true
});

export default transporter