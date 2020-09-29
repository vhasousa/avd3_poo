import { Router } from 'express';

import usersRouter from './users.routes';
import sessionRouter from './session.routes';
import eventsRouter from './events.routes';
import likesRouter from './likes.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/events', eventsRouter);
routes.use('/likes', likesRouter);

export default routes;
