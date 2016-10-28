import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';
import Review from '../review/review';

let User;

User = sequelize.define('user', {
  uuid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    field: 'user_id',
    autoIncrement: true
  },
  username: Sequelize.STRING,
  name: {
    field: 'full_name',
    type: Sequelize.STRING
  },
  password: {
    field: 'pwd',
    type: Sequelize.STRING
  },
  type: {
    field: 'user_type',
    type: Sequelize.STRING,
    defaultValue: 'tr'
  },
  email: {
    field: 'email',
    type: Sequelize.STRING
  }

}, {
  tableName: 'user_main',
  createdAt: 'added_at',
  updatedAt: 'updated_at',
  scopes: {
    tutors: {
      where: {
        'type': 'tr'
      }
    }
  }
});

User.hasMany(Review, {as: 'reviews', foreignKey: 'user_id'});
export default User;
