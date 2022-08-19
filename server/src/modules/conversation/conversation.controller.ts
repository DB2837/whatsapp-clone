import { Request, Response } from 'express';
import { getUserByID } from '../user/user.service';
import {
  clearUnreadMessages,
  createGroupConversation,
  deleteGroupConversation,
  getConversationInboxes,
  getConversationMembers,
  getGroupConversationAdmin,
  getUserConversation,
  getUserConversations,
} from './conversation.service';

export const getConversations = async (req: Request, res: Response) => {
  try {
    const userID = req.user.id;

    const conversations = await getUserConversations(userID);
    return res.status(201).send(conversations);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getConversation = async (req: Request, res: Response) => {
  try {
    const userID = req.user.id;
    const conversationID = req.params.id;

    const members = (await getConversationMembers(conversationID)) || [];
    const isMember = members.find((user) => user.userId === userID);

    if (!isMember) return;

    const conversation = await getUserConversation(conversationID, userID);
    return res.status(201).send(conversation);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const getInboxes = async (req: Request, res: Response) => {
  try {
    const userID = req.user.id;
    const inboxes = await getConversationInboxes(userID);

    return res.status(200).send(inboxes);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const createGroupChat = async (req: Request, res: Response) => {
  try {
    const creatorID = req.user.id;
    const { membersIDs, groupName } = req.body;
    const user = await getUserByID(creatorID);

    if (!user) {
      return res.status(400).send('invalid user');
    }

    const conversation = await createGroupConversation(
      membersIDs,
      creatorID,
      groupName
    );
    return res.status(201).send(conversation);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const deleteGroupChat = async (req: Request, res: Response) => {
  try {
    const adminID = req.user.id;
    const id = req.params.id;

    const groupAdmin = await getGroupConversationAdmin(id);

    if (!groupAdmin || groupAdmin?.userId !== adminID) {
      return res.status(401).send('unauthorized');
    }

    const deletedConversation = await deleteGroupConversation(id);

    return res.status(200).send(deletedConversation);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export const resetUnreadMessages = async (req: Request, res: Response) => {
  try {
    const userID = req.user.id;
    const conversationID = req.params.id;

    if (!userID || !conversationID) {
      return res.status(400).send('invalid user or conversation');
    }

    const cleared = await clearUnreadMessages(conversationID, userID);
    return res.status(200).send(cleared);
  } catch (error) {
    return res.status(500).send(error);
  }
};
