import express from 'express';
import Logger from '../lib/logger';
import User from '../app/user/user';
import Review from '../app/review/review';

const log = new Logger(__filename),
route = express.Router();

route.get('/:id/reviews', (req, res) => {
  console.log(req.params);

  User.findOne({
		where: {
      user_id:req.params.id
    },
		include: {
			model: Review,
			as: 'reviews'
		}
	}).then(function(d) {
		console.log(JSON.stringify(d, null, 4))
		// print(d.getReviews().then(print));
		res.jsonp(d.dataValues);
	});
});

export default route;
