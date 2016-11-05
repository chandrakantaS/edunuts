import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define('user', {
  id: {
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
    defaultValue: 'st'
  },
  email: {
    field: 'email',
    type: Sequelize.STRING
  },
  mobile: Sequelize.STRING

}, {
  tableName: 'user_main',
  createdAt: 'added_at',
  updatedAt: 'updated_at',
  scopes: {
    tutors: {
      where: {
        type: 'tr'
      }
    },
    students: {
      where: {
        type: [ 'pt', 'st' ]
      }
    }
  },
  instanceMethods: {
    toJSON() {
      const d = Object.assign({}, this.get());
      delete d.password;
      return d;
    }
  },
});
