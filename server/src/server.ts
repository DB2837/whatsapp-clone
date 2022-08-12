import express, { Application, Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import prisma from '../src/utils/prismaClient';
import { privateMessageHandler } from './modules/socket/socket.controller';
import { verifyJwtSocket /* , verifyJwtHTTP */ } from './middlewares/verifyJWT';
import userRouter from './modules/user/user.route';
import authRouter from './modules/auth/auth.route';
import conversationRouter from './modules/conversation/conversation.route';
import { notFound } from './middlewares/notFound';

dotenv.config();
const port = process.env.PORT;

const app: Application = express();
const httpServer = createServer(app);

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

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.use(verifyJwtSocket);
io.on('connection', (socket) => {
  console.log(socket.data.user);
  socket.join(socket.data.user.id);
  /* socket.emit('recive_private_message', {
    content: 'private message',
    from: socket.data.user,
  }); */
  socket.on('private message', ({ content, to }) =>
    privateMessageHandler(socket, content, to)
  );
});

/* io.on('connection', (socket) => {
  console.log(socket.id);
}); */

app.get('/', (_req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.use(notFound);

const main = async () => {
  try {
    httpServer.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();
