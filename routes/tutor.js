import express from 'express';
import Logger from '../lib/logger';
import User from '../app/user/user';
import Review from '../app/review/reviews';
import Class from '../app/tutor/class';
import Location from '../app/tutor/locations';
import Profile from '../app/tutor/profile';
import Data from '../app/tutor/data';
import Docs from '../app/user/documents';
import Experties from '../app/tutor/experties';

const log = new Logger(__filename),
  route = express.Router();

function getAllTutors(req, res) {
  const or = [];
  let query = {};

  if (req.query.q) {
    query = {
      where: {
        $or: or
      }
    };
    or.push({
      username: {
        $search: req.query.q
      }
    }, {
      full_name: {
        $search: req.query.q
      }
    });
  }

  User.scope('tutors').paginate(query, req).then(r => {
    // console.log(JSON.stringify(r, null, 4));
    res.json(r);
  });
}

function getReviews (req, res) {
  log.debug('Get reviews with id: ', req.params);
  User.hasMany(Review, { foreignKey: 'user_id' });
  User.findAll({
    where: {
      user_id: req.params.id
    },
    include: {
      model: Review
    }
  }).then((result) => {
		// console.log(JSON.stringify(d, null, 4))
    res.json(result);
  });
}

function getClasses(req, res) {
  log.debug('Get classes for id: ', req.params.id);
  User.hasMany(Class, { foreignKey: 'tutor_id' });
  User.findAll({
    where: {
      user_id: req.params.id
    },
    include: {
      model: Class
    }
  }).then(result => {
		// console.log(result);
    res.json(result[0]);
  });
}

function getLocation(req, res) {
  User.hasOne(Location, { foreignKey: 'tutor_id' });
  User.findOne({
    where: {
      user_id: req.params.id
    },
    include: {
      model: Location
    }
  }).then(result => {
		// console.log(result);
    res.json(result.dataValues);
  });
}

function getExperties(req, res) {
  Experties.findAll({
    where: {
      tutor_id: req.params.id
    }
  }).then(r => {
    res.json(r);
  });
  // res.send('To be done.');
}

function getTutorById(req, res) {
  log.info('Got request for id: ', req.params.id);
  User.scope('tutors').findAll({
    where: {
      user_id: req.params.id
    }
  }).then(result => {
    // console.log(JSON.stringify(result, null, 4));
    res.json(result);
  });
}

function getProfile(req, res) {
  User.hasOne(Profile, { foreignKey: 'tutor_id' });
  User.findOne({
    where: {
      user_id: req.params.id
    },
    include: {
      model: Profile
    }
  }).then(result => {
    res.json(result);
  });
}

function getData(req, res) {
  User.hasOne(Data, { foreignKey: 'id' });
  User.findOne({
    where: {
      user_id: req.params.id
    },
    include: {
      model: Data
    }
  }).then(result => {
    res.json(result.dataValues);
  });
}

function getStudents(req, res) {
  User.scope('students').findAll().then(result => {
    res.json(result);
  });
}

function getTeachingAreas(req, res) {
  Location.findAll({
    where: {
      tutor_id: req.params.id
    },
    attributes: [ 'name', 'radius' ]
  }).then(result => {
    res.json(result);
  });
  // res.end('No data');
}

function getDocuments(req, res) {
  Docs.findAll({
    where: {
      user_id: req.params.id
    }
  }).then(result => {
    res.json(result);
  });
}

route.get('/', getAllTutors);

// route.get('/:*', (req, res) => {
//   console.log(req.path);
//   const path = req.path.split('/');
//   console.log(path);
//   if (isNaN(parseInt(path[1]))) {
//     return;
//   }
//   switch (path[2]) {
//   case 'classes':
//     getClasses(req, res);
//     break;
//   default:
//     getTutorById(req, res);
//   }
// });

route.get('/:id', getTutorById);
route.get('/:id/reviews', getReviews);
route.get('/:id/classes', getClasses);
route.get('/:id/locations', getLocation);
route.get('/:id/experties', getExperties);
route.get('/:id/profile', getProfile);
route.get('/:id/data', getData);
route.get('/:id/students', getStudents);
route.get('/:id/teaching-areas', getTeachingAreas);
route.get('/:id/documents', getDocuments);

export default route;
