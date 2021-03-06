import cors from 'cors';
import express from 'express';

import { ApiDocRoutes } from './ApiDocRoutes'
import { AttendancesRoutes } from './AttendancesRoutes';
import { AuthRoutes } from './AuthRoutes';
import { AbsencesRoutes } from './AbsencesRoutes';
import { CommonRoutesConfig } from './CommonRoutes';
import { ClassesRoutes } from './ClassesRoutes';
import { CoursesRoutes } from './CoursesRoutes';
import { DelaysRoutes } from './DelaysRoutes';
import { EmployeesRoutes } from './EmployeesRoutes';
import { FacultiesRoutes } from './FacultiesRoutes';
import { InstitutionsRoutes } from './InstitutionsRoutes';
import { MessagesRoutes } from './MessagesRoutes';
import { NotesRoutes } from './NotesRoutes';
import { ResultsRoutes } from './ResultsRoutes';
import { RoomsRoutes } from './RoomsRoutes';
import { SanctionsRoutes } from './SanctionsRoutes';
import { SpeakersRoutes } from './SpeakersRoutes';
import { StudentsRoutes } from './StudentsRoutes';
import { UploadsRoutes } from './UploadsRoutes';
import { SubjectsRoutes } from './SubjectsRoutes';
import { SallesRoutes } from './SallesRoutes';
import { PromosRoutes } from './PromosRoutes';

const app: express.Application = express();
const routes: Array<CommonRoutesConfig> = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(`Server up and running!`)
});

app.get('/test', (req: express.Request, res: express.Response) => {
    res.render('test.ejs');
});

routes.push(new ApiDocRoutes(app));
routes.push(new AttendancesRoutes(app));
routes.push(new AuthRoutes(app));
routes.push(new AbsencesRoutes(app));
routes.push(new ClassesRoutes(app));
routes.push(new CoursesRoutes(app));
routes.push(new DelaysRoutes(app));
routes.push(new EmployeesRoutes(app));
routes.push(new FacultiesRoutes(app));
routes.push(new InstitutionsRoutes(app));
routes.push(new MessagesRoutes(app));
routes.push(new NotesRoutes(app));
routes.push(new ResultsRoutes(app));
routes.push(new RoomsRoutes(app));
routes.push(new SanctionsRoutes(app));
routes.push(new SpeakersRoutes(app));
routes.push(new StudentsRoutes(app));
routes.push(new SubjectsRoutes(app));
routes.push(new UploadsRoutes(app));
routes.push(new SallesRoutes(app));
routes.push(new PromosRoutes(app));

export {routes, app};