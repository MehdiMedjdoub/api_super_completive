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

        if(!req.body.userType) {
            res.status(400).send({
                success: false,
                message: "Missing userType. available values: 'student', 'speaker', 'employee'",
            });
            return;
        }

        if(!req.body.userName) {
            res.status(400).send({
                success: false,
                message: "Missing userName",
            });
            return;
        }

        const userModel = this.getModelByUserType(req.body.userType)
        const user = await userModel.findOne({userName: req.body.userName}).exec((err, user) => {
            
            if (err) {
                return;
            }
      
            if (!user) {
                res.status(404).send({
                    success: false,
                    message: "User not found !",
                });
                return;
            }

            if(!req.body.password) {
                res.status(400).send({
                    success: false,
                    message: "Missing password",
                });
                return;
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
        
            if (!passwordIsValid) {
                res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
                return;
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

    singUp = async (req: express.Request, res: express.Response) => {
        const newUser = req.body

        if (!newUser.userType) {
            res.status(400).send({
                success: false,
                message: "Missing userType",
            });
            return;
        }

        const userModel = this.getModelByUserType(newUser.userType)
        const user = new userModel(newUser);
        console.log(user)
        if(this.isMissingFields(user)) {
            res.status(400).send({
                success: false,
                message: "Une ou plusieurs données obligatoires sont manquantes",
            });
            return;
        }

        const emailAlReadyExist = await userModel.findOne({email: newUser.email}).exec();
        if(emailAlReadyExist) {
            res.status(409).send({
                success: false,
                message: `Un compte ${newUser.userType} utilisant cette adresse email existe déjà`,
            });
            return;
        }

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
        return user
    }

    forgotPassword = (req: express.Request, res: express.Response) => {
        const email = req.body.email
      
        EmployeeModel.findOne({email: email}).then(employee => {
            if (!employee){
                res.status(404).send({success:false, message:'Aucun utilisateur trouvé avec cette adresse'})
            }
            
            const passwordToken = crypto.randomBytes(32).toString('hex')
        
            EmployeeModel.findOneAndUpdate({_id: employee._id}, {$set:{passwordToken: passwordToken}}).exec();
        
            const tokenLink = `${process.env.FRONT_HOST}reset-password/${passwordToken}`
            mailerService.sendForgotPassword(tokenLink, employee.email)
        
            res.send({success: true, message: `Un email vien d'être envoyé à l'adresse mail suivante: ${email}`})
        })
    };

    passwordToken = (req: express.Request, res: express.Response) => {
        console.log(req.body)
        EmployeeModel.findOne({passwordToken: req.body.token}).then(user => {
            if (!user){
              res.send({error:'Invalid token',message: 'le token est invalid'})
            }
            res.status(200).json({
                success: true,
                message: 'passwordToken valid',
                data: user
            })
          })
    };

    resetPassword = (req: express.Request, res: express.Response) => {
        console.log(req.body)
        const password = bcrypt.hashSync(req.body.password.password, 8)
        console.log(password)
        EmployeeModel.findByIdAndUpdate({_id:req.body.userId.id}, {$set:{password: password}}).exec();
        res.status(200).json({
            success: true,
            message: 'Le mot de passe a été modifié',
        })
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

    isMissingFields = (user: any) => {
        switch(user.userType) {
            case 'student':
                if(
                    !user.email || !user.firstName || !user.lastName || !user.phone || !user.adress ||
                    !user.cp || !user.city || !user.faculty || !user.class || !user.promo 
                    ) {
                    return true;
                }
            case 'speaker':
                if(
                    !user.email || !user.firstName || !user.lastName || !user.phone ||
                    !user.adress || !user.cp || !user.city || !user.siretNumber 
                    ){
                    return true;
                }
            case 'employee':
                if(
                    !user.email || !user.firstName || !user.lastName || !user.phone ||
                    !user.adress || !user.cp || !user.city || !user.function 
                    ){
                    return true;
                }
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