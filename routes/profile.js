import express from 'express';
import Logger from '../lib/logger';
import User from '../app/user/user';

const log = new Logger(__filename),
  route = express.Router();

function updateProfile(req, res) {
  console.log(req.session);
  res.json(req.sessionID);
}

route.put('/', updateProfile)

export default route;
