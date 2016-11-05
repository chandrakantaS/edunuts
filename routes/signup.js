import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import Logger from '../lib/logger';
import User from '../app/user/user';
import Contacts from '../app/user/contacts';
import sendVerificationMail from '../app/email/sendVerificationMail';

const log = new Logger(__filename),
  route = express.Router();

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}


function validateUser(u) {
  if (!u.name) {
    return 'missing name';
  }
  if (!u.mobile) {
    return 'missing mobile number';
  }
  if (!u.email) {
    return 'missing email';
  }
  if (!u.password) {
    return 'missing password';
  } else {
    return false;
  }
}

export function saveNewUser(newUser) {
  log.info('newUser: ', newUser);
  sendVerificationMail(newUser.email);
  const e = validateUser(newUser);
  if (e) {
    log.debug('Missing credentials: ', e);
    return new Promise((rs, rj) => {
      rj(e);
    });
  }
  return User.build({
    name: newUser.name,
    password: generateHash(newUser.password)
  }).save()
  .then(r => {
    return Contacts.bulkCreate([ {
      userId: r.uuid,
      contact: newUser.email,
      type: 'email'
    }, {
      userId: r.uuid,
      contact: newUser.mobile,
      type: 'mobile'
    } ]);
  });
}

export function findUser(body) {
  // console.log('body: ', body)
  return User.scope('students').findAll({
    where: {
      email: body.email
    }
  });
}

function checkEmail(body) {
  return Contacts.scope('verified', 'email').findAll({
    where: {
      contact: body.email
    }
  });
}

function handleSignup(req, res) {
  checkEmail(req.body).then(result => {
    console.log(result);
    if (result.length === 0) {
      saveNewUser(req.body).then((r) => {
        // console.log(r)
        req.session.user_id = r.user_id;
        res.json(r);
      }).catch((e) => {
        log.error(e);
        res.send(e || 'Some error');
      });
    } else {
      res.status(409).send({ error: 'email exists' });
    }
  });
}

route.post('/', (req, res) => {
  req.session.username = req.body.username;
  req.session.name = req.body.name;
  req.session.email = req.body.email;
  req.session.mobile = req.body.mobile;
  // console.log(req.baseUrl)
  handleSignup(req, res);
});

export default route;
