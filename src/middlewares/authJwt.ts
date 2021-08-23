import express from 'express'
import 'dotenv/config'
import jwt from 'jsonwebtoken';
import { EmployeeModel } from '../models/EmployeeModel'
import { RoleModel } from '../models/RoleModel'

class AuthJwt {
    async verifyToken (req: express.Request, res: express.Response, next: express.NextFunction) {
        let token = req.headers['authorization'];
        
        if (!token) {
            return res.status(403).send({ message: "No token provided!" });
        }
        let splitToken = token.split(' ');
        try {
            const decoded = jwt.verify(splitToken[1], `${process.env.ACCESS_TOKEN_SECRET}` );
            next();
        } catch (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
    };
      
    async isAdmin (req: express.Request, res: express.Response, next: express.NextFunction) {
        EmployeeModel.findById(req.body.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
      
            RoleModel.find({_id: { $in: user?.id }}, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
        
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }
        
                res.status(403).send({ message: "Require Admin Role!" });
                return;
            });
        });
    };
      
    isModerator = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        EmployeeModel.findById(req.body.userId).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            RoleModel.find({ _id: { $in: user?.id }}, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
        
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "moderator") {
                        next();
                        return;
                    }
                }
        
                res.status(403).send({ message: "Require Moderator Role!" });
                return;
            });
        });
    };
}

export default new AuthJwt()