import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'addresses',
  {
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id',
      primaryKey: true
    },
    group: Sequelize.STRING
    name: Sequelize.STRING,
    type: Sequelize.STRING,
    value: Sequelize.STRING,
    status: Sequelize.ENUM
  },
  {
    tableName: 'user_addresses',
    createdAt: false,
    updatedAt: false
  }
);
