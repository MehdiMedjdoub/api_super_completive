import transporter from './transport'
import ejs from 'ejs'
import * as path from 'path';

let appDir = path.dirname(require.main.filename);

const mailerService = {
    sendForgotPassword: async (token: String, email: String) => {
        transporter.sendMail({
            from: '"L\'Équipe Super Completive" <no-reply@super-completive.com>', 
            to: '"'+ email +'"', 
            subject: "Changez votre mot de passe Super Completive", 
            html: await ejs.renderFile(appDir+'/views/forgotPassword.ejs', { link: token })
        });
    },

    sendConnectionInformations: async (userName: String, password: String, email: String) => {
        transporter.sendMail({
            from: '"L\'Équipe Super Completive" <no-reply@super-completive.com>', 
            to: '"'+ email +'"', 
            subject: "Bienvenue sur la platforme Super Completive", 
            html: await ejs.renderFile(appDir+'/views/connectionInformation.ejs', { userName: userName, password: password })
        });
    }
}

export default mailerService;
