import login from './login';
import signup from './signup';
import tutor from './tutor';
import users from './users';
import profile from './profile';

export default function(app) {
  app.use('/me', (req, res) => {
    // console.log(req);
    if (!req.session.email) {
      res.send('Login to continue');
      return;
    }
    res.json(req.session);
    // res.json(req.sessionID);
  });
  app.use('/profile', profile);
  app.use('/login', login);
  app.use('/signup', signup);
  app.use('/tutors', tutor);
  app.use('/users', users);
}
