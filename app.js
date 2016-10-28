import express from 'express';
import session from 'express-session';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import routes from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Logger from './lib/logger';

const log = new Logger(__filename);
const app = express(),
  dbHost = process.env.DB_MONGO || 'mongodb://localhost/edunuts';

dotenv.config({silent:true});
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET}));

mongoose.connect(dbHost, function(e) {
	if(e) {
		log.error(e);
	} else {
		log.info('Connected to mongo: ', dbHost);
	}
});
mongoose.set('debug', parseInt(process.env.APP_DEBUG) || false);
app.listen(process.env.APP_PORT || 3257, process.env.APP_HOST, function () {
  console.log('App listening on port ' + (process.env.APP_PORT || 3257));
});
routes(app);
module.exports = app;
