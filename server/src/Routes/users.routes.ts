import { Router } from 'express';
import { getRepository } from 'typeorm';

import UserController from '../app/controllers/UserController';
import User from '../app/models/Users';

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

    delete user.password_hash;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.get('/', async (request, response) => {
  const userRepository = getRepository(User);
  const user = await userRepository.find();
  return response.json(user);
});

usersRouter.get('/:id', async (request, response) => {
  const userRepository = getRepository(User);
  const { id } = request.params
  const user = await userRepository.findOne(id);
  delete user.password_hash;
  return response.json(user);
});

usersRouter.delete('/:id', async (request, response) => {
  const userRepository = getRepository(User);
  const { id } = request.params
  await userRepository.delete(id);
  return response.send();
});

export default usersRouter;
