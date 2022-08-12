import prisma from '../../utils/prismaClient';

export const createMessage = async (
  text: string,
  sentByUserID: string,
  conversationID: string
) => {
  return await prisma.message.create({
    data: {
      text: text,
      conversationId: conversationID,
      sentByUserId: sentByUserID,
    },
  });
};
