import express, { Request, Response } from 'express';
import cookieSession from 'cookie-session';
import { AppRouter } from './AppRouter';
import './controllers/LoginController';
import './controllers/RootController'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['asfsdadsdfd'] }));
app.use(AppRouter.getInstance());

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
