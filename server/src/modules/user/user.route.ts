import express from 'express';
import validateResource from '../../middlewares/validateResource';
import { registerUserHandler } from './user.controller';
import { createUserSchema } from './user.schema';

const router = express.Router();

router.post(
  '/api/register',
  validateResource(createUserSchema),
  registerUserHandler
);

export default router;
