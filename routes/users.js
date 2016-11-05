import express from 'express';
import Logger from '../lib/logger';
import User from '../app/user/user';
import filterQuery from '../lib/filterQuery';

const log = new Logger(__filename),
  route = express.Router();

function getAllUsers(req, res) {
  log.info(req.query);
  if (req.query.page) {
    User.paginate({}, req).then(r => {
      delete req.query.page;
      if (Object.values(req.query).length > 0) {
        // console.log(req.query);
        r.data = filterQuery(r.data, req.query);
      }
      res.jsonp(r);
    });
  } else {
    User.findAll().then(r => {
      let result = r;
      if (Object.values(req.query).length > 0) {
        result = filterQuery(r, req.query);
      }
      res.jsonp(result);
    });
  }
}

route.get('/', getAllUsers);

export default route;
