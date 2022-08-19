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
    /*  orderBy : {
      
      
      
    } */
  });
};

export const getUserConversation = async (
  conversationID: string,
  userID: string
) => {
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationID,
    },
    select: {
      id: true,
      isGroupChat: true,
      name: true,
      messages: {
        select: {
          text: true,
          sentAt: true,
          sentBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      },
      members: {
        where: {
          NOT: {
            userId: userID,
          },
        },
        select: {
          member: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
      /*  members: true,
      name: true, */
    },
  });

  return {
    id: conversation?.id,
    isGroupChat: conversation?.isGroupChat,
    name: conversation?.isGroupChat
      ? conversation.name
      : conversation?.members[0].member.firstName,
    messages: conversation?.messages,
  };
};

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

export const findConversation = async (conversationID: string) => {
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

export const incrementUnreadMessages = async (
  conversationID: string,
  userID: string
) => {
  await prisma.usersOnConversations.update({
    where: {
      conversationId_userId: {
        conversationId: conversationID,
        userId: userID,
      },
    },
    data: {
      unseenMessages: {
        increment: 1,
      },
    },
  });
};

export const clearUnreadMessages = async (
  conversationID: string,
  userID: string
) => {
  return await prisma.usersOnConversations.update({
    where: {
      conversationId_userId: {
        conversationId: conversationID,
        userId: userID,
      },
    },
    data: {
      unseenMessages: {
        set: 0,
      },
    },
  });
};

export const deleteGroupConversation = async (conversationID: string) => {
  return await prisma.conversation.delete({
    where: {
      id: conversationID,
    },
  });
};

export const getConversationInboxes = async (userID: string) => {
  const lastMessagesAndNames = await prisma.conversation.findMany({
    where: {
      members: {
        some: {
          userId: userID,
        },
      },
    },

    select: {
      id: true,
      isGroupChat: true,

      members: {
        where: {
          NOT: {
            userId: userID,
          },
        },
        select: {
          member: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
        },
      },
      messages: {
        orderBy: {
          sentAt: 'desc',
        },
        select: {
          text: true,
          sentAt: true,
          sentBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        take: 1,
      },
      name: true,
    },
  });

  const unreadMessages = await prisma.usersOnConversations.findMany({
    where: {
      userId: userID,
    },
    select: {
      unseenMessages: true,
    },
  });

  const inboxes = [];
  for (let i = 0; i < lastMessagesAndNames.length; i++) {
    inboxes.push({
      id: lastMessagesAndNames[i].id,
      lastMessage: lastMessagesAndNames[i].messages[0],
      name: lastMessagesAndNames[i].isGroupChat
        ? lastMessagesAndNames[i].name
        : lastMessagesAndNames[i].members[0].member.firstName,
      unreadMessages: unreadMessages[i].unseenMessages,
    });
  }

  inboxes.sort(
    (objA, objB) =>
      Number(objB.lastMessage.sentAt) - Number(objA.lastMessage.sentAt)
  );

  return inboxes;
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
