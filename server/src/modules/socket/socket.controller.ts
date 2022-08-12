/* import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events'; */

import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import {
  createPrivateConversation,
  findGroupConversation,
  findPrivateConversation,
  getConversationMembers,
  getConversationMessages,
  /*  saveMessageOnConversation, */
} from '../conversation/conversation.service';
import { createMessage } from '../message/message.service';
import { getUserByID } from '../user/user.service';

/* export const onConnectionHandler = (socket) => {
  
  console.log('socket ID: ', socket.id);
}; */

export const privateMessageHandler = async (
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

  const convMessages = await getConversationMessages(conversation.id);

  console.log(convMessages);
  console.log({ conversation });
  console.log('message', message);
  console.log('message: ', content);
  console.log('to: ', to);
  console.log('from: ', socket.data.user);

  /* socket.to(to).to(socket.data.user.id).emit('private message', {
    content,
    from: socket.data.user.id,
    to,
  }); */
};

export const groupMessageHandler = async (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  content: string,
  conversationID: string
) => {
  const conversation = await findGroupConversation(conversationID);

  if (!conversation) return;

  const members = (await getConversationMembers(conversationID)) || [];
  const isMember = members.find((id) => id === socket.data.user.id);

  if (!isMember) return;

  for (const member of members) {
    socket.to(member.userId).emit('group message', {
      content,
      from: socket.data.user,
    });
  }

  const message = await createMessage(
    content,
    socket.data.user.id,
    conversation.id
  );

  console.log({ conversation });
  console.log('message', message);
  console.log('message: ', content);

  console.log('from: ', socket.data.user);

  /* socket.to(to).to(socket.data.user.id).emit('private message', {
    content,
    from: socket.data.user.id,
    to,
  }); */
};
