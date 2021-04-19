import express from 'express';
import { UserModel } from '../models/UserModel'
import { StudentModel } from '../models/StudentModel'
import { EmployeeModel } from '../models/EmployeeModel'
import UserRoles from '../enums/UserRoles';

class SignUpMiddleware {
    async checkDuplicateUsernameOrEmail (req: express.Request, res: express.Response, next: express.NextFunction) {
        
        // check Username
        EmployeeModel.findOne({username: req.body.username}).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
      
            if (user) {
                res.status(400).send({ message: "Failed! Username is already in use!" });
                return;
            }
        });

        // check Email
        EmployeeModel.findOne({email: req.body.email}).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
      
            if (user) {
                res.status(400).send({ message: "Failed! Email is already in use!" });
                return;
            }
            next();
        });
    };

    async checkRolesExisted (req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body.roles) {
            for (let i = 0; i < req.body.roles.length; i++) {
                if (!Object.values(UserRoles).includes(req.body.roles[i])) {
                    res.status(400).send({
                        message: `Failed! Role ${req.body.roles[i]} does not exist!`
                    });
                    return;
                }
            }
        }
        next();
    };
}

export default new SignUpMiddleware()
