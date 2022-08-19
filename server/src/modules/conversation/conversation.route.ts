import { verifyJwtHTTP } from './../../middlewares/verifyJWT';
import express from 'express';
import validateResource from '../../middlewares/validateResource';
import {
  createGroupChatSchema,
  deleteGroupChatSchema,
} from './conversation.schema';
import {
  createGroupChat,
  deleteGroupChat,
  getConversation,
  getConversations,
  getInboxes,
  resetUnreadMessages,
} from './conversation.controller';

const router = express.Router();

router.get('/api/allConversations', verifyJwtHTTP, getConversations);
router.get('/api/inboxes', verifyJwtHTTP, getInboxes);
router.get('/api/conversation/:id', verifyJwtHTTP, getConversation);
router.patch(
  '/api/reset-unread-messages/:id',
  verifyJwtHTTP,
  resetUnreadMessages
);
router.post('/api/startConversation' /* validateResource() */);
router.post(
  '/api/createGroup',
  verifyJwtHTTP,
  validateResource(createGroupChatSchema),
  createGroupChat
);
router.patch('/api/conversation/:id'); //for groups chat
router.delete(
  '/api/conversation/:id',
  verifyJwtHTTP,
  validateResource(deleteGroupChatSchema),
  deleteGroupChat
); //for groups chat

export default router;
