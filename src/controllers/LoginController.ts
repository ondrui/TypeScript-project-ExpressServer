import { NextFunction, Request, Response } from 'express';
import { get, controller, use, bodyValidator, post } from './decorators';

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request was made!');
  next();
}

@controller('/auth')
class LoginController {

  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
      </form>
    `);
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email === 'one@one.one' && password === 'pass') {
      // Show that user is logged in
      req.session = { loggedIn: true };
      // Redirect to the root route
      res.redirect('/');
    } else {
      res.send('Invalid email or password');
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/');
  }
}
