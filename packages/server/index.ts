import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import express from 'express';
import { createClientAndConnect } from './db';

const app = express();

// app.use(cors())

app.use(express.static('../client/static'));
app.all(/.*/, (req, res) => res.sendFile('../client/index.html'));

const port = Number(process.env.SERVER_PORT) || 3001;

createClientAndConnect();

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)');
});

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
});
