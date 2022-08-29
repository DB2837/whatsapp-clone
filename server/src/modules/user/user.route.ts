import express from 'express';
import validateResource from '../../middlewares/validateResource';
import { getUsers, registerUserHandler } from './user.controller';
import { createUserSchema, searchByEmailSchema } from './user.schema';

const router = express.Router();

router.get(
  '/api/users-by-email',
  validateResource(searchByEmailSchema),
  getUsers
);
router.post(
  '/api/register',
  validateResource(createUserSchema),
  registerUserHandler
);

export default router;
