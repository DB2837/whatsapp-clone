import prisma from '../../utils/prismaClient';
/* import { getUserByID } from '../user/user.service'; */

export const getUserConversations = async (userID: string) => {
  return await prisma.conversation.findMany({
    where: {
      members: {
        some: {
          userId: userID,
        },
      },
    },
  });
};

/* export const getUserConversation = async (conversationID: string) => {
  return await prisma.conversation.findMany({
    where: {
      members: {
        some: {
          userId: userID,
        },
      },
    },
  });
}; */

export const createPrivateConversation = async (userIDs: string[]) => {
  /*  const users = await Promise.all(
    userIDs.map(async (id) => {
      return await getUserByID(id);
    })
  ); */

  return await prisma.conversation.create({
    data: {
      id: `${userIDs[0]} - ${userIDs[1]}`,
      members: {
        create: [
          {
            userId: userIDs[0],
          },
          {
            userId: userIDs[1],
          },
        ],
      },

      messages: {
        create: [],
      },
    },
  });
};

export const createGroupConversation = async (
  userIDs: string[],
  creatorID: string,
  groupName: string
) => {
  const IDs = userIDs.map((userId) => ({ userId }));
  const conversation = await prisma.conversation.create({
    data: {
      members: {
        create: [{ userId: creatorID }, ...IDs],
      },
      messages: {
        create: [],
      },
      isGroupChat: true,
      name: groupName,
    },
  });

  await prisma.usersOnConversations.update({
    where: {
      conversationId_userId: {
        conversationId: conversation.id,
        userId: creatorID,
      },
    },
    data: {
      isAdmin: true,
    },
  });

  return conversation;
};

export const findPrivateConversation = async (userIDs: string[]) => {
  return await prisma.conversation.findFirst({
    where: {
      OR: [
        {
          id: {
            equals: `${userIDs[0]} - ${userIDs[1]}`,
          },
        },
        {
          id: {
            equals: `${userIDs[1]} - ${userIDs[0]}`,
          },
        },
      ],
    },
    /*   select: {
      messages: true,
    }, */
  });
};

export const findGroupConversation = async (conversationID: string) => {
  return await prisma.conversation.findUnique({
    where: {
      id: conversationID,
    },
  });
};

export const getGroupConversationAdmin = async (conversationID: string) => {
  return await prisma.usersOnConversations.findFirst({
    where: {
      conversationId: conversationID,
      isAdmin: true,
    },
  });
};

export const getConversationMembers = async (conversationID: string) => {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationID,
    },
    select: {
      members: true,
    },
  });

  return conversation?.members;
};

export const getConversationMessages = async (conversationID: string) => {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationID,
    },
    select: {
      messages: true,
    },
  });

  return conversation?.messages;
};

export const deleteGroupConversation = async (conversationID: string) => {
  return await prisma.conversation.delete({
    where: {
      id: conversationID,
    },
  });
};

/* export const saveMessageOnConversation = async (
  message: Message,
  conversationID: string
) => {
  const result = await prisma.conversation.findFirst({
    where: {
      id: conversationID,
    },
    select: {
      messages: true,
    },
  });

  const prevMessages = result?.messages || [];

  await prisma.conversation.update({
    where: {
      id: conversationID,
    },
    data: {
      messages: {
        set: [...prevMessages, message],
      },
    },
  });
}; */
