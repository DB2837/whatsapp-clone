import { LoginSchemaInputs } from './auth.schema';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getUserByEmail, getUserByToken } from '../user/user.service';
import { comparePasswords } from '../../utils/hash';
import { revokeJWTs, setJWTs } from './auth.service';

dotenv.config();

export const loginHandler = async (
  req: Request<{}, {}, LoginSchemaInputs>,
  res: Response
) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'invalid email' });
    }

    const passwordsMatch = await comparePasswords(password, user.password);

    if (!passwordsMatch) {
      return res.status(400).json({ message: 'invalid password' });
    }

    //create JWTs
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, firstName: user.firstName },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '7m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, firstName: user.firstName },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: '7d' }
    );

    const socketToken = jwt.sign(
      { id: user.id, email: user.email, firstName: user.firstName },
      process.env.SOCKET_TOKEN_SECRET as string,
      { expiresIn: '7d' }
    );

    await setJWTs(user, refreshToken, socketToken);

    res.cookie('jwt', JSON.stringify(refreshToken), {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      maxAge: 24 * 60 * 60 * 7000,
    });

    return res.status(201).json({ accessToken, socketToken });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204); //No content
  }

  const refreshToken = cookies.jwt.replace(/\"/g, '');

  try {
    const user = await getUserByToken(refreshToken);
    if (!user) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.sendStatus(401);
    }

    await revokeJWTs(user);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  try {
    const refreshToken = cookies.jwt.replace(/\"/g, ''); //cookie come back whit "" quotes...

    const decoded = <jwt.UserJwtPayload>(
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string)
    );

    const user = await getUserByEmail(decoded.email);
    if (!user || user.jwt_refresh !== refreshToken) {
      return res
        .status(401)
        .json({ message: 'No user associated whit this token' });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: '7m' }
    );

    return res
      .status(201)
      .json({ accessToken: accessToken, socketToken: user.jwt_socket });
  } catch (error) {
    return res.status(401).json({ message: 'Could not refresh access token' });
  }
};
