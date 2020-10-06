import { Router } from 'express';

import SessionController from '../app/controllers/SessionController';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const sessionController = new SessionController();
    const { user, token } = await sessionController.store({
      email,
      password,
    });

    delete user.password_hash;

    return response.json({ user, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRouter;
