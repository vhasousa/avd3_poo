import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';

import Users from '../models/Users';

interface Request {
  userName: string;
  email: string;
  password_hash: string;
}

class UserController {
  public async store({ userName, email, password_hash }: Request): Promise<Users> {
    const userRepository = getRepository(Users);

    const userExists = await userRepository.findOne({
      where: { email },
    });

    if(userExists) {
      throw new Error('User already exists')
    }

    const hashedPassword = await hash(password_hash, 8)

    const user = userRepository.create({
      userName,
      email,
      password_hash: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default UserController;
