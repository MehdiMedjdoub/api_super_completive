import 'dotenv/config'
import * as http from 'http';
import {app} from './routes/index';
import connect from "./models/index";

const server: http.Server = http.createServer(app);
const port = process.env.PORT;

connect();

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});