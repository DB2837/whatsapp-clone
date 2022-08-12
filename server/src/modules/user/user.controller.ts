import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { hashPassword } from './../../utils/hash';
import { CreateUserInput } from './user.schema';
import { createUser, getUserByEmail } from './user.service';

dotenv.config();

export const registerUserHandler = async (
  req: Request<{}, {}, CreateUserInput>, // empty objects are for params and query
  res: Response
) => {
  try {
    const inputs = req.body;
    const userExists = await getUserByEmail(inputs.email);

    if (userExists) {
      return res.status(409).json({ message: 'This user already exists.' });
    }

    const { confirmPassword, password, ...rest } = inputs;
    const rounds = Number(process.env.ROUNDS);
    const hashedPassword = await hashPassword(password, rounds);

    const user = await createUser({ ...rest, password: hashedPassword });
    return res.status(201).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
};
