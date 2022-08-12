import { User } from '@prisma/client';
import prisma from '../../utils/prismaClient';

export const setJWTs = async (
  user: User,
  refreshToken: string,
  socketToken: string
) => {
  return await prisma.user.update({
    where: { id: user.id },
    data: { jwt_refresh: `${refreshToken}`, jwt_socket: `${socketToken}` },
  });
};

export const revokeJWTs = async (user: User) => {
  return await prisma.user.update({
    where: { id: user.id },
    data: { jwt_refresh: '', jwt_socket: '' },
  });
};
