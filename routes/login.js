import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import Logger from '../lib/logger';
import User from '../app/user/user';
import Review from '../app/review/review';

const log = new Logger(__filename),
route = express.Router();

export function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

function validPassword(pass, password) {
  return bcrypt.compareSync(pass, password);
};

export function authenticateUser(result, body) {
  // console.log(result, body)
  log.info('Authenticate login');
  return new Promise((resolve, reject) => {
    // console.log(result.password, body.pass)
    if (body.pass && validPassword(body.pass, result.password)) resolve();
    else {
      log.debug(result, body)
      reject('Authentication failure');
    }
  });
}

function validateUser(u) {
  if (!u.name) {
    return 'missing name';
  }
  if(!u.user) {
    return 'missing userid';
  }
  if (!u.email) {
    return 'missing email';
  }
  if (!u.pass) {
    return 'missing password'
  }
  else {
    return false;
  }
}

export function saveNewUser(newUser) {
  console.log('newUser: ', newUser);
  const e = validateUser(newUser);
  if(e) {
    log.debug('Missing credentials: ', e);
    return new Promise((rs, rj) => {
      rj(e);
    });
  }
  return User.build({
    name: newUser.name,
    username: newUser.user,
    password: generateHash(newUser.pass),
    email: newUser.email
  }).save();
}
//192.168.1.31:27017

export function findUser(body) {
  // console.log('body: ', body)
  return User.scope('tutors').findAll({
    where: {
      username: body.user
    }
  });
}

function handleLogin (req, res) {
  log.info('Got login request');
  // console.log(req)
  if(Object.keys(req.body).length > 0) {
    req.session.name = req.body.name;
    findUser(req.body).then(results => {
      // console.log('findUser: ', results);
      if(results.length > 0) {
        const result = results[0].dataValues;
        Object.defineProperty(result, "password", {
          enumerable: false
        });
        // console.log(result)
        authenticateUser(result, req.body)
        .then(() => {
          delete result.password;
          res.jsonp(result);
        }).catch((e) => {
          delete req.session.name;
          log.debug(e)
          res.send(e);
        });
      } else {
        log.info('Save new user.');
        saveNewUser(req.body).then(() => {
          res.send('Saved')
        }).catch((e) => {
          console.log(e);
          res.send(e || 'Some error')
        });
      }
    });
  } else {
    res.jsonp('Empty body');
  }
};

route.post('/', handleLogin);
route.get('/me', (req, res) => {
  if (!req.session.name) {
    res.send('Login to continue');
  }
  res.send('Welcome '+ req.session.name);
});

module.exports.login = route;
