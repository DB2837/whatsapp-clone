import prisma from '../../utils/prismaClient';

export const createMessage = async (
  text: string,
  sentByUserID: string,
  conversationID: string
) => {
  const message = await prisma.message.create({
    data: {
      text: text,
      conversationId: conversationID,
      sentByUserId: sentByUserID,
    },
  });

  return await prisma.message.findFirst({
    where: {
      id: message.id,
      conversationId: conversationID,
    },
    select: {
      id: true,
      text: true,
      sentBy: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};
