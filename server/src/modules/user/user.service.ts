import prisma from '../../utils/prismaClient';
import { CreateUserInput } from './user.schema';

function exclude<User, Key extends keyof User>(
  user: User,
  ...keys: Key[]
): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export const createUser = async (
  inputs: Omit<CreateUserInput, 'confirmPassword'>
) => {
  const user = await prisma.user.create({
    data: {
      ...inputs,
    },
  });

  return exclude(
    user,
    'password',
    'passwordRestCode',
    'jwt_refresh',
    'jwt_socket',
    'profilePic',
    'isOnline'
  );
};

export const getUserByToken = async (token: string) => {
  return await prisma.user.findFirst({
    where: {
      jwt_refresh: token,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
};

export const getUsersByEmail = async (email: string) => {
  return await prisma.user.findMany({
    where: {
      email: {
        contains: email,
      },
    },
    select: {
      email: true,
      isOnline: true,
      profilePic: true,
    },
  });
};

export const getUserByID = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
};
