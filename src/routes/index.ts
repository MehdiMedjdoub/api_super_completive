import cors from 'cors';
import express from 'express';

import { ApiDocRoutes } from './ApiDocRoutes'
import { AuthRoutes } from './AuthRoutes';
import { AbsencesRoutes } from './AbsencesRoutes';
import { CommonRoutesConfig } from './CommonRoutes';
import { CoursesRoutes } from './CoursesRoutes';
import { DelaysRoutes } from './DelaysRoutes';
import { EmployeesRoutes } from './EmployeesRoutes';
import { ResultsRoutes } from './ResultsRoutes';
import { SanctionsRoutes } from './SanctionsRoutes';
import { SpeakersRoutes } from './SpeakersRoutes';
import { StudentsRoutes } from './StudentsRoutes';
//import { UsersRoutes } from './UsersRoutes';

const app: express.Application = express();
const routes: Array<CommonRoutesConfig> = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server up and running!`)
});

//routes.push(new UsersRoutes(app));
routes.push(new ApiDocRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new AbsencesRoutes(app));
routes.push(new CoursesRoutes(app));
routes.push(new DelaysRoutes(app));
routes.push(new EmployeesRoutes(app));
routes.push(new ResultsRoutes(app));
routes.push(new SanctionsRoutes(app));
routes.push(new SpeakersRoutes(app));
routes.push(new StudentsRoutes(app));

export {routes, app};