import { Router } from 'express';
import { getRepository } from 'typeorm';

import UserController from '../app/controllers/UserController';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { userName, email, password_hash } = request.body;

    const userController = new UserController();

    const user = await userController.store({
      userName,
      email,
      password_hash,
    });

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRouter;
