import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'expertise',
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
    tableName: 'tutor_expertise',
    createdAt: false,
    updatedAt: false
  }
);
