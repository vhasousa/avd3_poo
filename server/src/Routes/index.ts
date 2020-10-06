import { Router } from 'express';

import usersRouter from './users.routes';
import sessionRouter from './session.routes';
import eventsRouter from './events.routes';
import likesRouter from './likes.routes';
import dislikesRouter from './dislikes.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/events', eventsRouter);
routes.use('/likes', likesRouter);
routes.use('/dislikes', dislikesRouter);

export default routes;
