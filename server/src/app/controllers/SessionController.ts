import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Users from '../models/Users';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: Users;
  token: string;
}

class SessionController {
  public async store({ email, password }: Request): Promise<Response> {
    const usuariosRepository = getRepository(Users);
    const user = await usuariosRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('E-mail ou senha incorretos');
    }

    const verificaSenha = await compare(password, user.password_hash);

    if (!verificaSenha) {
      throw new Error('E-mail ou senha incorretos');
    }

    const token = sign({}, '413192e0d18d5474cbcf879c400ee29f', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default SessionController;
