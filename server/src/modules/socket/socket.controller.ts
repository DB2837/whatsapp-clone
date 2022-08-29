/* import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events'; */

import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import {
  /*  createPrivateConversation, */
  findConversation,
  /*  findPrivateConversation, */
  getConversationMembers,
  getInbox,
  /*  getConversationMessages, */
  incrementUnreadMessages,
  /*  saveMessageOnConversation, */
} from '../conversation/conversation.service';
import { createMessage } from '../message/message.service';
/* import { getUserByID } from '../user/user.service'; */

/* export const onConnectionHandler = (socket) => {
  
  console.log('socket ID: ', socket.id);
}; */

/* export const privateMessageHandler = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  content: string,
  to: string
) => {
  socket.to(to).emit('private message', {
    content,
    from: socket.data.user,
  });

  const userOne = await getUserByID(socket.data.user.id);
  const userTwo = await getUserByID(to);

  if (!userOne || !userTwo || userOne.id === userTwo.id) return;

  let conversation = await findPrivateConversation([to, socket.data.user.id]);

  if (!conversation) {
    conversation = await createPrivateConversation([to, socket.data.user.id]);
  }

  const message = await createMessage(
    content,
    socket.data.user.id,
    conversation.id
  );

  await incrementUnreadMessages(conversation.id, to);

  const convMessages = await getConversationMessages(conversation.id);

  console.log(convMessages);
  console.log({ conversation });
  console.log('message', message);
  console.log('message: ', content);
  console.log('to: ', to);
  console.log('from: ', socket.data.user);

  
}; */

export const messageHandler = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  content: string,
  conversationID: string
) => {
  const conversation = await findConversation(conversationID);
  if (!conversation) return;

  const members = (await getConversationMembers(conversationID)) || [];
  const isMember = members.find((user) => user.userId === socket.data.user.id);

  if (!isMember) return;

  const message = await createMessage(
    content,
    socket.data.user.id,
    conversation.id
  );

  for (const member of members) {
    socket.to(member.userId).emit('recive message', message);
  }

  for (const member of members) {
    //if i set the await increment on the same for cycle of socket.emit messages may be slow to arrive
    if (member.userId !== socket.data.user.id) {
      await incrementUnreadMessages(conversation.id, member.userId);
    }

    const inbox = await getInbox(conversationID, member.userId);
    socket.to(member.userId).emit('new inbox', inbox);
  }
};
