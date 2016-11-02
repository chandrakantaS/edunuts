import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'data',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      field: 'fee_session'
    },
    name: Sequelize.STRING,
    value: Sequelize.STRING
  },
  {
    tableName: 'user_data',
    createdAt: false,
    updatedAt: false
  }
);
