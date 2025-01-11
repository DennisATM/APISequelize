import express, { urlencoded } from 'express';
import { serverInit } from './services/serverInit.js';

import userRouter from './routes/user.route.js';

const app = express();
const PORT = process.env.PORT || 3000 ;

app.use(express.json());
app.use(urlencoded({extended: true}));

serverInit(app, PORT);

app.use('/api/v1',userRouter);