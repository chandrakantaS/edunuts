import { login } from './login';;
import tutor from './tutor'

module.exports = function(app) {
	app.use('/login', login);
	app.use('/tutor', tutor);
}
