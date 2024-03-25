import express from 'express';
import morgan from 'morgan';
import {connectToDatabase} from './db';
import { newsRouter } from './routes/news.router';


connectToDatabase()
 .then(() =>{
  server.use("/news", newsRouter)
 })
 .catch((error: Error) => {
  console.error("Database connection failed", error);
  process.exit();
 });

const server = express();
server.use(express.json());
server.use(morgan('dev'));

export default server;
