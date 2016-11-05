import loginAndSignup from './loginAndSignup';
import tutor from './tutor';
import users from './users';

export default function(app) {
  app.use('/login', loginAndSignup);
  app.use('/signup', loginAndSignup);
  app.use('/tutors', tutor);
  app.use('/users', users);
}
