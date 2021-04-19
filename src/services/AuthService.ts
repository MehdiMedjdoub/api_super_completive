import 'dotenv/config'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import express from 'express'
import jwt from 'jsonwebtoken'
import mailerService from './nodemailer/MailerService'
import { EmployeeModel } from '../models/EmployeeModel'
import { StudentModel } from '../models/StudentModel'
import { SpeakerModel } from '../models/SpeakerModel'

class AuthService {
    singIn = async (req: express.Request, res: express.Response) => {
        const userModel = this.getModelByUserType(req.body.userType)
        const user = await userModel.findOne({userName: req.body.userName}).exec((err, user) => {
            
            if (err) {
                return;
            }
      
            if (!user) {
                console.log('user not found')
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
        
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            
            const token = jwt.sign({ id: user.id }, `${process.env.ACCESS_TOKEN_SECRET}`, {
                expiresIn: '24h'
            });

            res.status(200).send({
                success: true,
                message: "Utilisateur connecté",
                data:{
                    id: user._id,
                    userName: user.userName,
                    email: user.email,
                    isFirstLogin: user.firstLogin,
                    accessToken: token
                }
            });

            if (user.firstLogin) {
                this.updateFirstLoginStatus(user, userModel);
            }
        });
    }

    singUp = async (newUser: any) => {
        const userModel = this.getModelByUserType(newUser.userType)
        const user = new userModel(newUser);

        const randomPassword = Math.random().toString(36).slice(-10);

        let i = 0;
        let generatedUsername = this.generateNewUsername(newUser) + i
        let UniqUser = await userModel.findOne({"userName" : generatedUsername}).exec();

        while (UniqUser)
        { 
            i++
            generatedUsername = this.generateNewUsername(newUser) + i
            UniqUser = await userModel.findOne({"userName" : generatedUsername}).exec();
        }
        
        user.password = bcrypt.hashSync(randomPassword, 10);
        user.userName = generatedUsername;
        user.firstLogin = true;

        user.save();
        mailerService.sendConnectionInformations(user.userName, randomPassword, user.email)
    }

    forgotPassword = (req: express.Request, res: express.Response) => {
        const email = req.body.email
      
        StudentModel.findOne({email: email}).then(employee => {
            if (!employee){
                res.status(404).send({success:false, message:'Aucun utilisateur trouvé avec cette adresse'})
            }
            
            const passwordToken = crypto.randomBytes(32).toString('hex')
        
            StudentModel.findOneAndUpdate({_id: employee._id}, {$set:{passwordToken: passwordToken}}).exec();
        
            const tokenLink = `${process.env.FRONT_HOST}reset-password/${passwordToken}`
            mailerService.sendForgotPassword(tokenLink, employee.email)
        
            res.send({success: true, message: `Un email vien d'être envoyé à l'adresse mail suivante: ${email}`})
        })
    };

    resetPassword = (req: express.Request, res: express.Response) => {
        const password = bcrypt.hashSync(req.body.password, 8)
        StudentModel.findByIdAndUpdate({_id:req.body.id}, {$set:{password: password}}).exec();
    };

    getModelByUserType = (userType: any) => {
        switch(userType) {
            case 'student':
                return StudentModel;
            case 'speaker':
                return SpeakerModel;
            case 'employee':
                return EmployeeModel;
            default:
                return;
        }
    }

    generateNewUsername = (user: any) => {
        const firstLetter = user.firstName.charAt(0)
        const newUsername = firstLetter + user.lastName

        return newUsername;
    }

    updateFirstLoginStatus = (user:any, userModel: any) => {
        return userModel.findOneAndUpdate({_id: user._id}, {$set:{firstLogin: false}}).exec();
    }
}

export default new AuthService();