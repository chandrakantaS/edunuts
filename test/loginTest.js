import { saveNewUser, findUser, authenticateUser, generateHash } from '../routes/login';
import assert from 'assert';
import sequelize from '../app/connection/mysql';

describe('Login test', () => {
	const newUser = {
		"user": "edunuts",
		"pass": "password",
		"name": "testing user",
		"email":"testinguser@edunuts.com"
	};
	
	it('Save a new user', (done) => {
		sequelize.query("delete from user_main where username='edunuts'");
	  saveNewUser(newUser).then((r) => {
			console.log(r.dataValues);
			assert.equal(r.dataValues.username, 'edunuts');
			assert.equal(r.dataValues.name, 'testing user');
			assert.equal(r.dataValues.type, 'tr');
			done();
		}).catch((e) => {
			done(e);
		})
	});

	it('Get the saved user', (done) => {
		findUser(newUser).then(r => {
			console.log(r[0].dataValues)
			assert.equal(r[0].dataValues.username, 'edunuts');
			assert.equal(r[0].dataValues.name, 'testing user');
			assert.equal(r[0].dataValues.type, 'tr');
			done();
		}).catch(e => {
			done(e)
		});
	});

	it('Authenticate a user', done => {
		authenticateUser({
			"user": "edunuts",
			"password": generateHash("password")
		}, {
			"user": "edunuts",
			"pass": "password"
		}).then(() => {
			done();
		}).catch(e => {
			done(e)
		})
	});

	it('Should throw error on wrong password', done => {
		authenticateUser({
			"user": "edunuts",
			"password": generateHash("password")
		}, {
			"user": "edunuts",
			"pass": "wrongpassword"
		}).then(() => {
			done(new Error('Did not throw error on wrong password'));
		}).catch(e => {
			console.log(e);
			assert.equal(e, 'Authentication failure')
			done()
		})
	})
})
