import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Socket } from 'socket.io';
import { jwtPayloadSchema } from '../modules/auth/auth.schema';
import { ExtendedError } from 'socket.io/dist/namespace';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

dotenv.config();

export const verifyJwtHTTP = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']; //Beaer + token:

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const decoded = <jwt.UserJwtPayload>(
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
    );

    jwtPayloadSchema.parse(decoded); //jwt docs recommend to sanitize it
    req.user = decoded as jwt.UserJwtPayload;
    return next();
  } catch (error) {
    return res.status(403).send(error);
  }
};

export const verifyJwtSocket = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError | undefined) => void
) => {
  try {
    const token = socket.handshake.auth.token;
    /*  console.log('TOKEN', token); */
    const decoded = <jwt.UserJwtPayload>(
      jwt.verify(token, process.env.SOCKET_TOKEN_SECRET as string)
    );

    /* jwtPayloadSchema.parse(decoded); */
    socket.data.user = decoded;

    /*  console.log(socket.data); */
    return next();
  } catch (err) {
    return next(err);
  }
};
