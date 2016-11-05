import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'groups',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING
  },
  {
    tableName: 'user_groups',
    createdAt: false,
    updatedAt: false
  }
);
