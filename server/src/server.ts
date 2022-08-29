import express, { Application } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import prisma from '../src/utils/prismaClient';
import {
  messageHandler,
  /* privateMessageHandler, */
} from './modules/socket/socket.controller';
import { verifyJwtSocket /* , verifyJwtHTTP */ } from './middlewares/verifyJWT';
import userRouter from './modules/user/user.route';
import authRouter from './modules/auth/auth.route';
import conversationRouter from './modules/conversation/conversation.route';
import { notFound } from './middlewares/notFound';

dotenv.config();
const port = process.env.PORT;

const app: Application = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
);

app.use(authRouter);
app.use(userRouter);
app.use(conversationRouter);
/* app.use('/register', route.registerRouter);
app.use('/login', route.loginRouter);
app.use('/refresh', route.refreshRouter);
app.use('/logout', route.logoutRouter);
 */
/* app.use(verifyJwtHTTP); */

/* io.on('connection', (socket) => {
  console.log(socket.id);
}); */

app.use(notFound);

const main = async () => {
  try {
    httpServer.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

      io.use(verifyJwtSocket);
      io.on('connection', (socket) => {
        console.log(socket.data.user);
        socket.join(socket.data.user.id);

        socket.on('message', ({ content, conversationID }) =>
          messageHandler(socket, content, conversationID)
        );
      });
    });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
