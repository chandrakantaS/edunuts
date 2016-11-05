import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import Logger from '../lib/logger';
import User from '../app/user/user';
import Contacts from '../app/user/contacts';

const log = new Logger(__filename),
  route = express.Router();

export function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function validPassword(pass, password) {
  return bcrypt.compareSync(pass, password);
}

export function authenticateUser(result, body) {
  // console.log(result, body)
  log.info('Authenticate login');
  return new Promise((resolve, reject) => {
    // console.log(result.password, body.pass)
    if (body.password && validPassword(body.password, result.password)) resolve();
    else {
      log.debug(result, body);
      reject('Authentication failure');
    }
  });
}

export function findUser(body) {
  // console.log('body: ', body)
  return new Promise((resolve, reject) => {
    Contacts.scope('email').findOne({
      where: {
        contact: body.email
      }
    })
    .then(result => {
      console.log(result.dataValues)
      User.scope('students').findOne({
        where: {
          user_id: result.userId
        }
      }).then(r => {
        console.log(r.dataValues)
        resolve({
          ...r.dataValues,
          email: result.dataValues.contact,
          mobile: result.dataValues.mobile
        });
      })
      .catch(e => {
        reject(e);
      });
    }).catch(e => {
      reject(e);
    });
  });
}

function handleLogin (req, res) {
  log.info('Got login request');
  // console.log(req)
  if (
    Object.keys(req.body).length === 0 ||
    !req.body.email || !req.body.password
  ) {
    res.end('no username or password');
    return;
  }
  findUser(req.body).then(result => {
    console.log('found user: ', result);
      // console.log(result)
    authenticateUser(result, req.body)
    .then(() => {
      req.session.user_id = result.id;
      req.session.name = result.name;
      req.session.mobile = result.mobile;
      delete result.password;
      res.status(200).json(result);
    }).catch((e) => {
      delete req.session.name;
      log.debug(e);
      res.status(401).send(e);
    });

  }).catch(e => {
    log.info('User does not exist');
    res.end(e);
  });
}

route.post('/', (req, res) => {
  req.session.username = req.body.username;
  req.session.name = req.body.name;
  req.session.email = req.body.email;
  req.session.mobile = req.body.mobile;
  handleLogin(req, res);
});

export default route;
