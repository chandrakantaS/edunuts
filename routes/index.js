import { login } from './login';;
import tutor from './tutor';
import users from './users';

module.exports = function(app) {
	app.use('/login', login);
	app.use('/tutors', tutor);
	app.use('/users', users);
}
