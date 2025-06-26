

import express from 'express';
import * as path from 'path';
import router from './routes';
import { StatusCodes } from 'http-status-codes';
import { Request,Response,NextFunction } from 'express';
import { IErrorResponse,CustomError } from './interfaces/error.interface';
import compression from 'compression';
import helmet from 'helmet'
import { winstonLogger } from './utils/logger';
import { Logger } from 'winston';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const log:Logger = winstonLogger(process.env.ELASTIC_SEARCH_URL,'Backend Server','debug')
const app = express();



app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials:true
}))
// route middleware
app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to elearn api!' });
});
app.use(router)
// error handling middleware
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: 'The endpoint called does not exist.'});
  next();
});
app.use((error: IErrorResponse, _req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json(error.serializeErrors());
  }
  else{

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
  next();
});


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  log.info(`Listening at http://localhost:${port}/api`)
});
server.on('error', console.error);
