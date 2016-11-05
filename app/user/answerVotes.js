import sequelize from '../connection/mysql';
import Sequelize from 'sequelize';

export default sequelize.define(
  'answer',
  {
    userId: {
      type: Sequelize.INTEGER,
      field: 'user_id',
      primaryKey: true
    },
    answerId: {
      type: Sequelize.INTEGER,
      field: 'answer_id',
      primaryKey: true
    },
    vote: Sequelize.INTEGER
  },
  {
    tableName: 'user_answer_votes',
    createdAt: false,
    updatedAt: false
  }
);
