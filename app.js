import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Logger from './lib/logger';

import routes from './routes';
import './lib/myglobals';

const log = new Logger(__filename);
const app = express(),
  dbHost = process.env.DB_MONGO || 'mongodb://localhost/edunuts';

app.use(bodyParser.json());
app.use(session({secret: process.env.SESSION_SECRET}));

// mongoose.connect(dbHost, function(e) {
// 	if(e) {
// 		log.error(e);
// 	} else {
// 		log.info('Connected to mongo: ', dbHost);
// 	}
// });
// mongoose.set('debug', parseInt(process.env.APP_DEBUG) || false);
app.listen(process.env.APP_PORT || 3257, process.env.APP_HOST, function () {
  console.log('App listening on port ' + (process.env.APP_PORT || 3257));
});
routes(app);
module.exports = app;
