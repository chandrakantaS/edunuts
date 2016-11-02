import express from 'express';
import Logger from '../lib/logger';
import User from '../app/user/user';
import Review from '../app/review/review';
import Class from '../app/tutor/class';
import Location from '../app/tutor/locations';
import Profile from '../app/tutor/profile';
import Data from '../app/tutor/data';
import enumerable from '../lib/enumerable';
import _ from 'lodash';

const log = new Logger(__filename),
route = express.Router();

function getAllTutors(req, res) {
	// console.log(req)
	User.scope('tutors').paginate({}, req).then(r => {
		r.data.map(data => {
      return enumerable(data.dataValues)
    });
		// console.log(JSON.stringify(r, null, 4));
		res.jsonp(r)
	});
}

function getReviews (req, res) {
  log.debug('Get reviews with id: ', req.params);
	User.hasMany(Review, {as: 'reviews', foreignKey: 'user_id'});
  User.findOne({
		where: {
      user_id:req.params.id
    },
		include: {
			model: Review,
			as: 'reviews'
		}
	}).then(function(result) {
		// console.log(JSON.stringify(d, null, 4))
		enumerable(result.dataValues);
		res.jsonp(result.dataValues);
	});
}

function getClasses(req, res) {
	log.debug('Get classes');
	User.hasMany(Class, {foreignKey: 'tutor_id'});
	User.findOne({
		where: {
			user_id: req.params.id
		},
		include: {
			model: Class
		}
	}).then(result => {
		// console.log(result);
		enumerable(result.dataValues)
		res.jsonp(result.dataValues)
	})
}

function getLocation(req, res) {
	User.hasOne(Location, {foreignKey: 'tutor_id'});
	User.findOne({
		where: {
			user_id: req.params.id
		},
		include: {
			model: Location
		}
	}).then(result => {
		// console.log(result);
		enumerable(result.dataValues)
		res.jsonp(result.dataValues)
	})
}

function getExperties(req, res) {
	// Class.findOne({where: {
	// 	tutor_id: req.params.id
	// }}).then(r => {
	// 	r.experties.then(rs => {
	// 		console.log(rs)
	// 	})
	// }
	res.send('To be done.');
}

function getTutorById(req, res) {
	User.findOne({
		where: {
			user_id: req.params.id
		}
	}).then(result => {
		// console.log(result)
		enumerable(result.dataValues);
		res.jsonp(result.dataValues)
	})
}

function getProfile(req, res) {
	User.hasOne(Profile, {foreignKey: 'tutor_id'});
	User.findOne({
		where: {
			user_id: req.params.id
		},
		include: {
			model: Profile
		}
	}).then(result => {
		enumerable(result.dataValues);
		res.jsonp(res.dataValues)
	})
}

function getData(req, res) {
	User.hasOne(Data, {foreignKey: 'id'});
	User.findOne({
		where: {
			user_id: req.params.id
		},
		include: {
			model: Data
		}
	}).then(result => {
		enumerable(result.dataValues);
		res.jsonp(result.dataValues);
	})
}

route.get('/', getAllTutors);
route.get('/:id', getTutorById);
route.get('/:id/reviews', getReviews);
route.get('/:id/classes', getClasses);
route.get('/:id/locations', getLocation);
route.get('/:id/experties', getExperties);
route.get('/:id/profile', getProfile);
route.get('/:id/data', getData);

export default route;
