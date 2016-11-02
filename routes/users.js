import express from 'express';
import Logger from '../lib/logger';
import User from '../app/user/user';
import enumerable from '../lib/enumerable';

const log = new Logger(__filename),
route = express.Router();

function buildRegEx(query) {
  let regEx, string = '';
  Object.values(query).forEach(q => {
    if (q.length === 0) return;
    string += '(^|\\s)' + q + '|';
  });
  string = string.slice(0, string.length-1);
  regEx = new RegExp(string, 'i');
  console.log(regEx);
  return regEx;
}

function filterQuerySearch (data, query) {
  // console.log(Object.values(query));
  const regEx = buildRegEx(query);
  return data.filter(d => {
    return (
        regEx.test(d.dataValues.name) ||
        regEx.test(d.dataValues.username) ||
        regEx.test(d.dataValues.type) ||
        regEx.test(d.dataValues.email)
      );
  });
}

function getAllUsers(req, res) {
  console.log(req.query);
  if (req.query.page){
    User.paginate({}, req).then(r => {
      r.data.map(data => {
        return enumerable(data.dataValues)
      });
      delete req.query.page;
      if(Object.values(req.query).length > 0) {
        // console.log(req.query);
        r.data = filterQuerySearch(r.data, req.query);
      }
      res.jsonp(r)
    });
  } else {
    User.findAll().then(r => {
      r.map(data => {
        return enumerable(data.dataValues)
      });
      if(Object.values(req.query).length > 0) {
        r = filterQuerySearch(r, req.query);
      }
      res.jsonp(r);
    });
  }
}

route.get('/', getAllUsers);

export default route;
