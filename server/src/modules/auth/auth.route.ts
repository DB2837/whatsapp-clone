import express from 'express';
import validateResource from '../../middlewares/validateResource';
import { loginSchema } from './auth.schema';
import {
  loginHandler,
  logoutHandler,
  refreshTokenHandler,
} from './auth.controller';

const router = express.Router();

router.post('/api/login', validateResource(loginSchema), loginHandler);
router.get('/api/logout', logoutHandler);
router.get('/api/refreshJWT', refreshTokenHandler);

export default router;
