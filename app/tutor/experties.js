import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'experties',
  {
    id: {
      type: Sequelize.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true
    },
    name: Sequelize.STRING,
    tutorId: {
      type: Sequelize.INTEGER,
      field: 'tutor_id'
    }
  },
  {
    tableName: 'tutor_experties',
    createdAt: false,
    updatedAt: false
  }
);
