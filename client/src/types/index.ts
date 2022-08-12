import { io } from 'socket.io-client'

const socket = io()

export type TSocket = typeof socket
