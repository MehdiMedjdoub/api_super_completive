const uploadFile = require("../middlewares/UploadFile");
const fs = require('fs');
const http = require('http')
import express from 'express';
import  { StudentModel } from '../models/StudentModel';
import  { SpeakerModel } from '../models/SpeakerModel';
import  { EmployeeModel } from '../models/EmployeeModel';

class UploadController {
    async upload (req: any, res: express.Response) {
    try {
        await uploadFile(req, res);
        const userId = req.body.user

        if(!req.body.userType) {
            res.status(400).send({
                success: false,
                message: "Missing userType. available values: 'student', 'speaker', 'employee'",
            });
            return;
        }

        console.log(req.file)
        if (req.file == undefined) {
        return res.status(400).send({ message: "Please upload a file!" });
        }

        let user = {}
        if(req.body.userType === 'student') {
            user = await StudentModel.findOneAndUpdate({_id: userId}, {$set:{haveAvatar: true}}).exec();
        }
        else if(req.body.userType === 'speaker') {
            user = await SpeakerModel.findOneAndUpdate({_id: userId}, {$set:{haveAvatar: true}}).exec();
        }
        else if(req.body.userType === 'employee') {
            user = await EmployeeModel.findOneAndUpdate({_id: userId}, {$set:{haveAvatar: true}}).exec();
        }
        
        res.status(200).json({
            success: true, 
            message: "image uploadée avec succés", 
            data: user
        });

        // res.status(200).send({
        // message: "Uploaded the file successfully: " + req.file.originalname,
        // });
    } catch (err) {
        res.status(500).send({
        message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
    };

    async getFile (req: any, res: any) {
        const path = `./public/static/assets/uploads/avatar/${req.params.userId}.jpg`
        fs.access(path, fs.F_OK, (err: any) => {
            if (err) {
              console.error(err)
              return
            }
          
            //file exists
            fs.readFile(path, function(err: any, data: any) {
                if (err) throw err // Fail if the file can't be read.

                res.writeHead(200, {'Content-Type': 'image/jpeg'})
                res.end(data) // Send the file data to the browser.
            })
        })
        // fs.readFile(`./public/static/assets/uploads/${req.params.userId}.jpg`, function(err: any, data: any) {
        //     if (err) throw err // Fail if the file can't be read.
        //     // http.createServer(function(req: any, res: any) {
        //     res.writeHead(200, {'Content-Type': 'image/jpeg'})
        //     res.end(data) // Send the file data to the browser.
        //     // }).listen(8124)
        //     // console.log('Server running at http://localhost:8124/')
        // })
    }
    //  getListFiles  (req: any, res:  any)  {
    // const directoryPath =  "./resources/static/assets/uploads/";

    // fs.readdir(directoryPath, function (err: any, files: any) {
    //     if (err) {
    //     res.status(500).send({
    //         message: "Unable to scan files!",
    //     });
    //     }

    //     // let fileInfos:[] = [];

    //     // files.forEach((file) => {
    //     //   fileInfos.push({
    //     //     name: file,
    //     //     url: baseUrl + file,
    //     //   });
    //     // });

    //     // res.status(200).send(fileInfos);
    // });
    // };

    // download (req: any, res: any) {
    // const fileName = req.params.name;
    // const directoryPath = "./resources/static/assets/uploads/";

    // res.download(directoryPath + fileName, fileName, (err: any) => {
    //     if (err) {
    //     res.status(500).send({
    //         message: "Could not download the file. " + err,
    //     });
    //     }
    // });
    // };
}

export default new UploadController();

// module.exports = {
//   upload,
//   getListFiles,
//   download,
// };