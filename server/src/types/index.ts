import jwt, { UserJwtPayload } from 'jsonwebtoken';
export {};

declare module 'jsonwebtoken' {
  export interface UserJwtPayload extends jwt.JwtPayload {
    id: string;
    email: string;
    firstName: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user: UserJwtPayload /* {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
      }; */;
    }
  }
}
