import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';
import Exp from './expertise';

export default sequelize.define(
  'class',
  {
    tutorId: {
      type: Sequelize.INTEGER,
      field: 'tutor_id',
      primaryKey: true,
      autoIncrement: true
    },
    class: {
      type: Sequelize.STRING,
      field: 'class_id'
    },
    amount: Sequelize.INTEGER,
    session: Sequelize.STRING,
    level: Sequelize.INTEGER,
    experties: {
      type: Sequelize.TEXT,
    }
  },
  {
    tableName: 'tutor_classes',
    createdAt: false,
    updatedAt: false
  }
);
