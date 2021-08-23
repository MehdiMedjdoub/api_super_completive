import mongoose from "mongoose";
import 'dotenv/config'

export default () => {

    const dbUrl = `${process.env.DB_HOST}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_PORT}/${process.env.DB_NAME}?${process.env.DB_OPTIONS}`

    const connect = () => {
        mongoose
        .connect(dbUrl, { useNewUrlParser: true })
        // .connect('mongodb+srv://MehdiMedj:casquettegrise@cluster0.y60c6.mongodb.net/completive_api?retryWrites=true&w=majority', { useNewUrlParser: true })
        .then(() => {
            return console.log(`Successfully connected to database`);
        })
        .catch(error => {
            console.log("Error connecting to database: ", error);
            console.log(dbUrl)
            return process.exit(1);
        });
    };
    connect();

    mongoose.connection.on("disconnected", connect);
};
