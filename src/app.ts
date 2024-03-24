import express from 'express';
import morgan from 'morgan';

const server = express();
server.use(express.json());
server.use(morgan('dev'));

server.get('/', (req, res)=>{
  console.log('ruta de prueba');
  res.send("Hello worold")
});

export default server;
